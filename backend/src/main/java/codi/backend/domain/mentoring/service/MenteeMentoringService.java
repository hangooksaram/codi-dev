package codi.backend.domain.mentoring.service;

import codi.backend.domain.mentoring.dto.MentoringDto;
import codi.backend.domain.mentoring.entity.Mentoring;

public interface MenteeMentoringService {
    Mentoring createMentoring(Long profileId, Long mentorId, MentoringDto.MentoringPost mentoringPostDto);
    void cancelMentoring(Long profileId, Long mentoringId);
    void rateMentor(MentoringDto.RateMentorRequest rateMentorRequest);
}
