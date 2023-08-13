package codi.backend.domain.mentoring.service;

import codi.backend.domain.mentoring.dto.MentoringDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MentorMentoringService {
    void acceptMentoring(Long mentorId, Long mentoringId);
    void rejectMentoring(Long mentorId, Long mentoringId);
    void addMentoringLink(Long mentorId, Long mentoringId, MentoringDto.MentoringLinkRequest mentoringLinkRequest);
    MentoringDto.MentoringDailyMenteesResponse findDailyMentoringsOfMentor(Long mentorId, String date);
    MentoringDto.MentoringMonthlyMenteesResponse findMonthlyMentoringsOfMentor(Long mentorId, String month);
    Page<MentoringDto.MentoringApplicationResponse> getAllMentoringApplication(Long mentorId, String order, Pageable pageable);
}
