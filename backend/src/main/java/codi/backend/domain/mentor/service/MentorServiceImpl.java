package codi.backend.domain.mentor.service;

import codi.backend.auth.utils.CustomAuthorityUtils;
import codi.backend.domain.member.entity.Member;
import codi.backend.domain.member.service.MemberService;
import codi.backend.domain.mentor.dto.MentorDto;
import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.mentor.repository.MentorRepository;
import codi.backend.domain.mentoring.dto.MentoringDto;
import codi.backend.domain.mentoring.repository.MentoringRepository;
import codi.backend.domain.schedule.dto.ScheduleDto;
import codi.backend.domain.schedule.repository.ScheduleRepository;
import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MentorServiceImpl implements MentorService{
    private final MentorRepository mentorRepository;
    private final MemberService memberService;
    private final CustomAuthorityUtils authorityUtils;
    private final MentoringRepository mentoringRepository;
    private final ScheduleRepository scheduleRepository;

    public MentorServiceImpl(MentorRepository mentorRepository, MemberService memberService, CustomAuthorityUtils authorityUtils, MentoringRepository mentoringRepository, ScheduleRepository scheduleRepository) {
        this.mentorRepository = mentorRepository;
        this.memberService = memberService;
        this.authorityUtils = authorityUtils;
        this.mentoringRepository = mentoringRepository;
        this.scheduleRepository = scheduleRepository;
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

    // 멘토링 횟수
    @Override
    public Integer getNumberOfCompletedMentorings(Long mentorId) {
        LocalDateTime now = LocalDateTime.now();
        List<MentoringDto.MentoringInfo> completedMentorings = mentoringRepository.findAcceptedMentoringsBeforeCurrentTime(mentorId, now);
        return completedMentorings.size();
    }

    // 응답률
    @Override
    public Double calculateResponseRate(Long mentorId) {
        List<MentoringDto.MentoringInfo> allMentorings = mentoringRepository.findByMentorId(mentorId);
        int totalApplications = allMentorings.size();
        int completedSessions = getNumberOfCompletedMentorings(mentorId);

        if (totalApplications == 0) {
            return 0.0;
        }

        return ((double) completedSessions / totalApplications) * 100;
    }

    @Override
    public Integer getNumberOfSchedules(Long mentorId) {
        LocalDateTime now = LocalDateTime.now();
        List<ScheduleDto.ScheduleInfo> mentorSchedules = scheduleRepository.findSchedulesOfMentor(mentorId, now);
        return mentorSchedules.size();
    }

    @Transactional
    @Override
    public Mentor updateMentorInformation(Long mentorId, Mentor mentor, MultipartFile file) {
        Mentor findMentor = findMentor(mentorId);

        // Mentor field 수정
        if (mentor != null) {
            updateMentorFields(mentor, findMentor);
        }

        return mentorRepository.save(findMentor);
    }

    private void updateMentorFields(Mentor inputMentor, Mentor findMentor) {
        if (inputMentor == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_MENTOR_ERROR);
        }
        Optional.ofNullable(inputMentor.getCareer())
                .ifPresent(findMentor::setCareer);
        Optional.ofNullable(inputMentor.getJob())
                .ifPresent(findMentor::setJob);
        Optional.ofNullable(inputMentor.getIntroduction())
                .ifPresent(findMentor::setIntroduction);
        Optional.ofNullable(inputMentor.getMentoringCategories())
                .ifPresent(findMentor::setMentoringCategories);
    }

    @Transactional(readOnly = true)
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

    // TODO 배점 관련 논의 필요함
    private int calculateScore(MentorDto.IntermediateMentorResponse mentor, MentorDto.RecommendationMentorRequest request) {
        int score = 0;
        if (mentor.getDisability().equals(request.getDisability())) score += 100;
        if (mentor.getJob().equals(request.getFirstJob())) score += 50;
        if (mentor.getJob().equals(request.getSecondJob())) score += 30;
        if (mentor.getJob().equals(request.getThirdJob())) score += 10;
        score += mentor.getStar(); // 별점을 점수로 사용
        return score;
    }

    private MentorDto.SearchMentorResponse convertToSearchMentorResponse(MentorDto.IntermediateMentorResponse mentorResponse) {
        return MentorDto.SearchMentorResponse.builder()
                .mentorId(mentorResponse.getMentorId())
                .nickname(mentorResponse.getNickname())
                .imgUrl(mentorResponse.getImgUrl())
                .career(mentorResponse.getCareer())
                .job(mentorResponse.getJob())
                .disability(mentorResponse.getDisability())
                .severity(mentorResponse.getSeverity())
                .star(mentorResponse.getStar())
                .mentees(mentorResponse.getMentees())
                .build();
    }
}
