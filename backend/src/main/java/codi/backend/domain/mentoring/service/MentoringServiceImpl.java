package codi.backend.domain.mentoring.service;

import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.mentor.repository.MentorRepository;
import codi.backend.domain.mentoring.dto.MentoringDto;
import codi.backend.domain.mentoring.entity.Mentoring;
import codi.backend.domain.mentoring.repository.MentoringRepository;
import codi.backend.domain.schedule.repository.ScheduleRepository;
import codi.backend.domain.profile.entity.Profile;
import codi.backend.domain.profile.repository.ProfileRepository;
import codi.backend.domain.schedule.entity.Schedule;
import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Transactional
@Service
public class MentoringServiceImpl implements MentoringService{
    private final MentoringRepository mentoringRepository;
    private final ProfileRepository profileRepository;
    private final MentorRepository mentorRepository;
    private final ScheduleRepository scheduleRepository;

    public MentoringServiceImpl(MentoringRepository mentoringRepository, ProfileRepository profileRepository, MentorRepository mentorRepository, ScheduleRepository scheduleRepository) {
        this.mentoringRepository = mentoringRepository;
        this.profileRepository = profileRepository;
        this.mentorRepository = mentorRepository;
        this.scheduleRepository = scheduleRepository;
    }

    @Override
    public Mentoring applyMentoring(Long profileId, Long mentorId, MentoringDto.MentoringPost mentoringPostDto) {
        Profile profile = getProfile(profileId);
        Mentor mentor = getMentor(mentorId);

        LocalDateTime[] times = convertToStartAndEndTime(mentoringPostDto.getDate(), mentoringPostDto.getTime());

        Schedule schedule = findSchedule(mentor, times[0], times[1]);
        checkScheduleMentoring(schedule);

        Mentoring mentoring = Mentoring.builder()
                .status(Mentoring.MentoringStatus.APPLICATION)
                .applicationReason(mentoringPostDto.getApplicationReason())
                .mentor(mentor)
                .profile(profile)
                .schedule(schedule)
                .build();

        profile.addMentoring(mentoring);
        mentor.addMentoring(mentoring);

        return mentoringRepository.save(mentoring);
    }

    private Profile getProfile(Long profileId) {
        return profileRepository.findById(profileId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PROFILE_NOT_FOUND));
    }

    private Mentor getMentor(Long mentorId) {
        return mentorRepository.findById(mentorId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_MENTOR_ERROR));
    }

    private LocalDateTime[] convertToStartAndEndTime(String date, String time) {
        String[] divisionTime = time.split(" - ");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm");
        return new LocalDateTime[]{
                LocalDateTime.parse(date + " " + divisionTime[0], formatter),
                LocalDateTime.parse(date + " " + divisionTime[1], formatter)
        };
    }

    private Schedule findSchedule(Mentor mentor, LocalDateTime startTime, LocalDateTime endTime) {
        return scheduleRepository
                .findByMentorAndStartDateTimeAndEndDateTime(mentor, startTime, endTime)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.SCHEDULE_NOT_FOUND));
    }

    private void checkScheduleMentoring(Schedule schedule) {
        if (schedule.getMentoring() != null) {
            throw new BusinessLogicException(ExceptionCode.MENTORING_ALREADY_EXIST);
        }
    }
}
