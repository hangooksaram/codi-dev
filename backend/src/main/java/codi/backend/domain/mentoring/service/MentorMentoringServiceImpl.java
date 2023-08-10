package codi.backend.domain.mentoring.service;

import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.mentor.service.MentorService;
import codi.backend.domain.mentoring.dto.MentoringDto;
import codi.backend.domain.mentoring.entity.Mentoring;
import codi.backend.domain.mentoring.repository.MentoringRepository;
import codi.backend.domain.profile.entity.Profile;
import codi.backend.domain.profile.service.ProfileService;
import codi.backend.domain.schedule.entity.Schedule;
import codi.backend.domain.schedule.service.ScheduleService;
import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MentorMentoringServiceImpl implements MentorMentoringService{
    private final MentoringRepository mentoringRepository;
    private final ProfileService profileService;
    private final MentorService mentorService;
    private final ScheduleService scheduleService;

    public MentorMentoringServiceImpl(MentoringRepository mentoringRepository, ProfileService profileService, MentorService mentorService, ScheduleService scheduleService) {
        this.mentoringRepository = mentoringRepository;
        this.profileService = profileService;
        this.mentorService = mentorService;
        this.scheduleService = scheduleService;
    }

    @Transactional
    @Override
    public void acceptMentoring(Long mentorId, Long mentoringId) {
        Mentoring mentoring = findMentoring(mentoringId);

        checkMentoringStatusIsApplication(mentoring);
        checkMentoringOwner(mentorId, mentoring);

        mentoring.setMentoringStatus(Mentoring.MentoringStatus.ACCEPTED);
        mentoringRepository.save(mentoring);
    }

    @Transactional
    @Override
    public void rejectMentoring(Long mentorId, Long mentoringId) {
        Mentoring mentoring = findMentoring(mentoringId);

        checkMentoringStatusIsApplication(mentoring);
        checkMentoringOwner(mentorId, mentoring);

        mentoring.setMentoringStatus(Mentoring.MentoringStatus.REJECTED);
        mentoring.setSchedule(null);
        mentoringRepository.save(mentoring);
    }

    @Transactional
    @Override
    public void addMentoringLink(Long mentorId, Long mentoringId, MentoringDto.MentoringLinkRequest mentoringLinkRequest) {
        Mentoring mentoring = findMentoring(mentoringId);

        checkMentoringStatusIsAccepted(mentoring);
        checkMentoringOwner(mentorId, mentoring);

        mentoring.setLink(mentoringLinkRequest.getLink());
        mentoring.setMentoringPlatform(Mentoring.MentoringPlatform.platformOf(mentoringLinkRequest.getPlatform()));
        mentoringRepository.save(mentoring);
    }

    private Mentoring findMentoring(Long mentoringId) {
        return mentoringRepository.findById(mentoringId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MENTORING_NOT_FOUND));
    }

    private void checkMentoringStatusIsApplication(Mentoring mentoring) {
        // Check if the mentoring is not application
        if (mentoring.getMentoringStatus() != Mentoring.MentoringStatus.APPLICATION) {
            throw new BusinessLogicException(ExceptionCode.MENTORING_NOT_APPLICATION);
        }
    }

    private void checkMentoringStatusIsAccepted(Mentoring mentoring) {
        // Check if the mentoring is not accepted
        if (mentoring.getMentoringStatus() != Mentoring.MentoringStatus.ACCEPTED) {
            throw new BusinessLogicException(ExceptionCode.MENTORING_NOT_ACCEPTED);
        }
    }

    private void checkMentoringOwner(Long mentorId, Mentoring mentoring) {
        // Check if the mentoring is not own
        if (!mentoring.getMentor().getId().equals(mentorId)) {
            throw new BusinessLogicException(ExceptionCode.NOT_YOUR_MENTORING);
        }
    }
}
