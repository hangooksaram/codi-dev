package codi.backend.domain.schedule.repository;

import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.schedule.dto.ScheduleDto;
import codi.backend.domain.schedule.entity.Schedule;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface ScheduleRepositoryCustom {
    ScheduleDto.ScheduleDailyResponse findDailySchedules(Mentor mentor, LocalDate date);
    ScheduleDto.ScheduleMonthlyResponse findMonthlySchedules(Mentor mentor, LocalDate month);
    List<Schedule> findAllByMentorAndDate(Mentor mentor, LocalDate date);
    List<ScheduleDto.ScheduleInfo> findSchedulesOfMentor(Long mentorId, LocalDateTime currentTime);
    Long deleteAllByMentorAndDate(Mentor mentor, LocalDate date);
}
