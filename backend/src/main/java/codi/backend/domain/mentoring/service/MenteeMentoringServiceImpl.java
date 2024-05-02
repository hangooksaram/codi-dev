package codi.backend.domain.mentoring.service;

import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.mentor.service.MentorService;
import codi.backend.domain.mentoring.dto.MentoringDto;
import codi.backend.domain.mentoring.entity.Mentoring;
import codi.backend.domain.mentoring.repository.MentoringRepository;
import codi.backend.domain.profile.service.ProfileService;
import codi.backend.domain.profile.entity.Profile;
import codi.backend.domain.schedule.entity.Schedule;
import codi.backend.domain.schedule.service.ScheduleService;
import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.exception.ExceptionCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@Transactional
@Service
public class MenteeMentoringServiceImpl implements MenteeMentoringService {
    private final MentoringRepository mentoringRepository;
    private final ProfileService profileService;
    private final MentorService mentorService;
    private final ScheduleService scheduleService;

    public MenteeMentoringServiceImpl(MentoringRepository mentoringRepository, ProfileService profileService, MentorService mentorService, ScheduleService scheduleService) {
        this.mentoringRepository = mentoringRepository;
        this.profileService = profileService;
        this.mentorService = mentorService;
        this.scheduleService = scheduleService;
    }

    @Transactional
    @Override
    public void createMentoring(Long profileId, Long mentorId, MentoringDto.MentoringPost mentoringPostDto) {
        Profile profile = profileService.findProfile(profileId);
        Mentor mentor = mentorService.findMentor(mentorId);
        checkSelfApplication(profile, mentor);

        LocalDateTime[] times = scheduleService.convertToStartAndEndTime(mentoringPostDto.getDate(), mentoringPostDto.getTime());

        Schedule schedule = scheduleService.findSchedule(mentor, times[0], times[1]);
        scheduleService.checkScheduleMentoring(schedule);

        Mentoring mentoring = Mentoring.builder()
                .mentoringStatus(Mentoring.MentoringStatus.APPLICATION)
                .applicationReason(mentoringPostDto.getApplicationReason())
                .mentor(mentor)
                .profile(profile)
                .schedule(schedule)
                .build();

        profile.addMentoring(mentoring);
        mentor.addMentoring(mentoring);

        mentoringRepository.save(mentoring);
    }

    private void checkSelfApplication(Profile profile, Mentor mentor) {
        if (mentor.getMember().equals(profile.getMember())) {
            throw new BusinessLogicException(ExceptionCode.SELF_MENTORING_REQUEST);
        }
    }

    @Transactional
    @Override
    public void cancelMentoring(Long profileId, Long mentoringId) {
        Mentoring mentoring = findMentoring(mentoringId);
        Profile profile = profileService.findProfile(profileId);
        Mentor mentor = mentoring.getMentor();

        checkSameMentoring(profile, mentoring);

        profile.removeMentoring(mentoring);
        mentor.removeMentoring(mentoring);
    }

    private Mentoring findMentoring(Long mentoringId) {
        return mentoringRepository.findById(mentoringId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MENTORING_NOT_FOUND));
    }

    private void checkSameMentoring(Profile profile, Mentoring mentoring) {
        if (!profile.getMentoringList().contains(mentoring)) {
            throw new BusinessLogicException(ExceptionCode.NOT_YOUR_MENTORING);
        }
    }

    @Transactional
    @Override
    public void rateMentor(MentoringDto.RateMentorRequest rateMentorRequest) {
        Mentoring mentoring = findMentoring(rateMentorRequest.getMentoringId());
        validateMentorRating(mentoring, rateMentorRequest);

        // Set star value for the mentoring
        mentoring.setRating(rateMentorRequest.getStar());

        // Recalculate the average star value for the mentor
        Mentor mentor = mentoring.getMentor();
        double avgStar = mentor.getMentoringList().stream()
                .filter(m -> m.getRating() != null)
                .mapToDouble(Mentoring::getRating)
                .average()
                .orElse(0.0);

        // Set star value
        mentor.setStar(avgStar);
    }

    private void validateMentorRating(Mentoring mentoring, MentoringDto.RateMentorRequest rateMentorRequest) {
        // Check if the mentoring is not application
        if (mentoring.getMentoringStatus() != Mentoring.MentoringStatus.APPLICATION) {
            throw new BusinessLogicException(ExceptionCode.MENTORING_NOT_APPLICATION);
        }

        // Validate star value
        if (rateMentorRequest.getStar() < 0 || rateMentorRequest.getStar() > 5) {
            throw new BusinessLogicException(ExceptionCode.INVALID_STAR_VALUE);
        }

        // Check if the mentor ID matches
        if (!mentoring.getMentor().getId().equals(rateMentorRequest.getMentorId())) {
            throw new BusinessLogicException(ExceptionCode.MENTOR_MISMATCH);
        }

        // Check rate a mentoring before
        if (mentoring.getRating() != null) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_RATED_MENTORING);
        }
    }

    @Transactional(readOnly = true)
    @Override
    public MentoringDto.MentoringDailyMentorsResponse findDailyMentoringsOfMentee(Long profileId, String date) {
        Profile profile = profileService.findProfile(profileId);
        LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy/MM/dd"));
        return mentoringRepository.findDailyMentoringsOfMentee(profile, localDate);
    }

    @Transactional(readOnly = true)
    @Override
    public MentoringDto.MentoringMonthlyMentorsResponse findMonthlyMentoringsOfMentee(Long profileId, String month) {
        Profile profile = profileService.findProfile(profileId);
        LocalDate localDateMonth = LocalDate.parse(month + "/01", DateTimeFormatter.ofPattern("yyyy/MM/dd"));
        return mentoringRepository.findMonthlyMentoringsOfMentee(profile, localDateMonth);
    }

    @Override
    public List<MentoringDto.TodayMentoringInfoResponse> findMentoringSchedules(Long profileId) {
        Profile profile = profileService.findProfile(profileId);
        return mentoringRepository.findTodayMentoringSchedules(profile);
    }
}
