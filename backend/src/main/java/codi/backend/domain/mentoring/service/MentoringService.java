package codi.backend.domain.mentoring.service;

import codi.backend.domain.mentoring.dto.MentoringDto;
import codi.backend.domain.mentoring.entity.Mentoring;

public interface MentoringService {
    Mentoring applyMentoring(Long profileId, Long mentorId, MentoringDto.MentoringPost mentoringPostDto);
}
