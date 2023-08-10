package codi.backend.domain.mentoring.service;

import codi.backend.domain.mentoring.dto.MentoringDto;

public interface MentorMentoringService {
    void acceptMentoring(Long mentorId, Long mentoringId);
    void rejectMentoring(Long mentorId, Long mentoringId);
    void addMentoringLink(Long mentorId, Long mentoringId, MentoringDto.MentoringLinkRequest mentoringLinkRequest);
}
