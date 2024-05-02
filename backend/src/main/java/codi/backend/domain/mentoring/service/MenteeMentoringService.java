package codi.backend.domain.mentoring.service;

import codi.backend.domain.mentoring.dto.MentoringDto;

import java.util.List;

public interface MenteeMentoringService {
    void createMentoring(Long profileId, Long mentorId, MentoringDto.MentoringPost mentoringPostDto);
    void cancelMentoring(Long profileId, Long mentoringId);
    void rateMentor(MentoringDto.RateMentorRequest rateMentorRequest);
    MentoringDto.MentoringDailyMentorsResponse findDailyMentoringsOfMentee(Long profileId, String date);
    MentoringDto.MentoringMonthlyMentorsResponse findMonthlyMentoringsOfMentee(Long profileId, String month);
    List<MentoringDto.TodayMentoringInfoResponse> findMentoringSchedules(Long profileId);
}
