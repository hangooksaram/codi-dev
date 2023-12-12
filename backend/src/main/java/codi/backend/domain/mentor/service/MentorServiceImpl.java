package codi.backend.domain.mentor.service;

import codi.backend.domain.member.entity.Member;
import codi.backend.domain.member.service.MemberService;
import codi.backend.auth.utils.CustomAuthorityUtils;
import codi.backend.domain.mentor.dto.MentorDto;
import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.mentor.repository.MentorRepository;
import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.exception.ExceptionCode;
import codi.backend.global.file.S3Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MentorServiceImpl implements MentorService{
    private final MentorRepository mentorRepository;
    private final MemberService memberService;
    private final S3Service s3Service;
    private final CustomAuthorityUtils authorityUtils;

    public MentorServiceImpl(MentorRepository mentorRepository, MemberService memberService, S3Service s3Service, CustomAuthorityUtils authorityUtils) {
        this.mentorRepository = mentorRepository;
        this.memberService = memberService;
        this.s3Service = s3Service;
        this.authorityUtils = authorityUtils;
    }

    @Transactional
    @Override
    public Mentor becomeMentor(String memberId, Mentor mentor, MultipartFile file) {
        Member member = memberService.findMember(memberId);

        if (member.getProfile() == null) {
            throw new BusinessLogicException(ExceptionCode.PROFILE_NOT_FOUND);
        }

        if (member.getMentor() != null) {
            throw new BusinessLogicException(ExceptionCode.MENTOR_EXIST);
        }

        Optional.ofNullable(file)
                .filter(f -> !f.isEmpty())
                .map(f -> s3Service.upload(f, "mentor"))
                .ifPresentOrElse(mentor::setFileUrl, () -> mentor.setFileUrl(null));

        // 파일이 null이 아닌 경우에만 isCertificate를 true로 설정
        mentor.setIsCertificate(Optional.ofNullable(file).isPresent());

        // member : mentor 1:1 연결
        member.setMentor(mentor);
        mentor.setMember(member);

        // 멘토 권한 추가(반드시 위에서 mentor 객체를 연결한 다음 실행되어야 한다.)
        member.setRoles(authorityUtils.createRoles(member));

        // mentor DB 저장
        return mentorRepository.save(mentor);
    }

    @Transactional(readOnly = true)
    @Override
    public Mentor findMentor(Long mentorId) {
        return verifyMentor(mentorId);
    }

    private Mentor verifyMentor(Long mentorId) {
        return mentorRepository.findById(mentorId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_MENTOR_ERROR));
    }

    @Transactional
    @Override
    public Mentor updateMentorInformation(Long mentorId, Mentor mentor, MultipartFile file) {
        Mentor findMentor = findMentor(mentorId);

        // Mentor file 수정
        updateMentorFile(findMentor, file);

        // Mentor field 수정
        if (mentor != null) {
            updateMentorFields(mentor, findMentor);
        }

        return mentorRepository.save(findMentor);
    }

    // TODO S3Service에 넣어두고 값만 다르게 넘기면 될 듯 Mentor 부분을 Object로??
    private void updateMentorFile(Mentor findMentor, MultipartFile file) {
        String previousFileUrl = findMentor.getFileUrl();

        try {
            if (file != null && !file.isEmpty()) {
                // 파일을 업로드하고 기존 파일이 있으면 삭제합니다.
                String newFileUrl = s3Service.upload(file, "mentor");
                findMentor.setFileUrl(newFileUrl);

                if (previousFileUrl != null) {
                    s3Service.delete(previousFileUrl);
                }
            } else if (file != null && file.isEmpty() && previousFileUrl != null) {
                // 파일 파라미터가 비어 있고 기존 파일이 있는 경우, 기존 파일을 삭제합니다.
                s3Service.delete(previousFileUrl);
                findMentor.setFileUrl(null);
            }
        } catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.FILE_UPDATE_FAILED);
        }
    }

    private void updateMentorFields(Mentor inputMentor, Mentor findMentor) {
        if (inputMentor == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_MENTOR_ERROR);
        }

        Optional.ofNullable(inputMentor.getFileUrl())
                .ifPresent(findMentor::setFileUrl);
        Optional.ofNullable(inputMentor.getJob())
                .ifPresent(findMentor::setJob);
        Optional.ofNullable(inputMentor.getCareer())
                .ifPresent(findMentor::setCareer);
        Optional.ofNullable(inputMentor.getCompany())
                .ifPresent(findMentor::setCompany);
        Optional.ofNullable(inputMentor.getInOffice())
                .ifPresent(findMentor::setInOffice);
        Optional.ofNullable(inputMentor.getIntroduction())
                .ifPresent(findMentor::setIntroduction);
        Optional.ofNullable(inputMentor.getMentoringCategories())
                .ifPresent(findMentor::setMentoringCategories);
    }

    @Override
    public Page<MentorDto.SearchMentorResponse> searchMentors(String job, String career, String disability, String keyword, Pageable pageable) {
        return mentorRepository.search(job, career, disability, keyword, pageable);
    }

    @Transactional(readOnly = true)
    @Override
    public List<MentorDto.SearchMentorResponse> recommendMentors(MentorDto.RecommendationMentorRequest request) {
        List<MentorDto.IntermediateMentorResponse> recommendedMentors = mentorRepository.getMentorsByRanking(request);

        // TODO 추후 리팩토링 필요
        if (recommendedMentors.isEmpty()) {
            recommendedMentors = mentorRepository.getMentorsByRanking(MentorDto.RecommendationMentorRequest.builder().build());
        }

        recommendedMentors.sort((mentor1, mentor2) -> {
            int score1 = calculateScore(mentor1, request);
            int score2 = calculateScore(mentor2, request);
            return score2 - score1; // 점수 높은 순서대로 정렬
        });

        // 상위 4명의 MentorResponse 객체 가져오기
        List<MentorDto.IntermediateMentorResponse> top4Mentors = recommendedMentors.subList(0, Math.min(recommendedMentors.size(), 4));

        return top4Mentors.stream()
                .map(this::convertToSearchMentorResponse)
                .collect(Collectors.toList());
    }

    private int calculateScore(MentorDto.IntermediateMentorResponse mentor, MentorDto.RecommendationMentorRequest request) {
        int score = 0;
        if (mentor.getDisability().equals(request.getDisability())) score += 100;
        if (mentor.getJob().equals(request.getFirstJob())) score += 50;
        if (mentor.getJob().equals(request.getSecondJob())) score += 30;
        if (mentor.getJob().equals(request.getThirdJob())) score += 10;
        if (mentor.getIsCertificate()) score += 5;
        if (mentor.getInOffice()) score += 3; // 재직 상태를 점수로 반영
        score += mentor.getStar(); // 별점을 점수로 사용
        return score;
    }

    private MentorDto.SearchMentorResponse convertToSearchMentorResponse(MentorDto.IntermediateMentorResponse mentorResponse) {
        return MentorDto.SearchMentorResponse.builder()
                .id(mentorResponse.getId())
                .mentorId(mentorResponse.getMentorId())
                .imgUrl(mentorResponse.getImgUrl())
                .isCertificate(mentorResponse.getIsCertificate())
                .name(mentorResponse.getName())
                .job(mentorResponse.getJob())
                .jobName(mentorResponse.getJobName())
                .career(mentorResponse.getCareer())
                .disability(mentorResponse.getDisability())
                .severity(mentorResponse.getSeverity())
                .star(mentorResponse.getStar())
                .mentees(mentorResponse.getMentees())
                .build();
    }
}
