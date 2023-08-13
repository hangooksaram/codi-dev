package codi.backend.domain.mentoring.repository;

import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.mentoring.dto.MentoringDto;
import codi.backend.domain.profile.entity.Profile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

public interface MentoringRepositoryCustom {
    MentoringDto.MentoringDailyMenteesResponse findDailyMentoringsOfMentor(Mentor mentor, LocalDate date);
    MentoringDto.MentoringMonthlyMenteesResponse findMonthlyMentoringsOfMentor(Mentor mentor, LocalDate month);
    MentoringDto.MentoringDailyMentorsResponse findDailyMentoringsOfMentee(Profile profile, LocalDate date);
    MentoringDto.MentoringMonthlyMentorsResponse findMonthlyMentoringsOfMentee(Profile profile, LocalDate month);
    Page<MentoringDto.MentoringApplicationResponse> findAllMentoringApplications(Mentor mentor, String order, Pageable pageable);
}
