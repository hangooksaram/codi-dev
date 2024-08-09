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
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
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
    public Page<MentorDto.MentorProfileResponse> searchMentors(MentorDto.SearchMentorRequest searchMentorRequest, Pageable pageable) {
        return mentorRepository.search(searchMentorRequest, pageable);
    }

    @Transactional(readOnly = true)
    @Override
    public List<MentorDto.MentorProfileResponse> recommendMentors(MentorDto.RecommendationMentorRequest recommendationMentorRequest) {
        List<MentorDto.MentorProfileResponse> recommendedMentors = mentorRepository.getMentorsByRanking(recommendationMentorRequest);

        if (recommendedMentors.isEmpty()) {
            return mentorRepository.getTop4Mentors();
        }

        return recommendedMentors.stream()
                .sorted(Comparator.comparingInt(mentor -> calculateScore((MentorDto.MentorProfileResponse) mentor, recommendationMentorRequest)).reversed()) // calculateScore 메서드의 매개변수가 한 개가 아니라 직접 캐스팅 필요
                .collect(Collectors.toList());
    }

    private int calculateScore(MentorDto.MentorProfileResponse mentor, MentorDto.RecommendationMentorRequest request) {
        int score = 0;

        // 직무 가중치 계산
        score += getJobWeight(mentor.getJob(), request.getFirstJob(), 100);
        score += getJobWeight(mentor.getJob(), request.getSecondJob(), 50);
        score += getJobWeight(mentor.getJob(), request.getThirdJob(), 25);

        // 장애 유형 가중치 계산
        if (mentor.getDisability().equals(request.getDisability())) score += 20;

        // 별점을 점수로 사용
        score += mentor.getStar().intValue();

        return score;
    }

    private int getJobWeight(String mentorJob, String requestJob, int weight) {
        return mentorJob.equals(requestJob) ? weight : 0;
    }
}
