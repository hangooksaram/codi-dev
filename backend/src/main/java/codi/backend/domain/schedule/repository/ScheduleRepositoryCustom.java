package codi.backend.domain.schedule.repository;

import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.schedule.dto.ScheduleDto;
import codi.backend.domain.schedule.entity.Schedule;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface ScheduleRepositoryCustom {
    List<ScheduleDto.ScheduleTempInfo> findDailySchedules(Mentor findMentor, LocalDate date);
    List<ScheduleDto.ScheduleTempInfo> findMonthlySchedules(Mentor findMentor, LocalDate startDayOfMonth, LocalDate endDayOfMonth);
    List<Schedule> findAllByMentorAndDate(Mentor mentor, LocalDate date);
    List<ScheduleDto.ScheduleInfo> findSchedulesOfMentor(Long mentorId, LocalDateTime currentTime);
    long deleteAllByMentorAndDate(Mentor mentor, LocalDate date);
}
