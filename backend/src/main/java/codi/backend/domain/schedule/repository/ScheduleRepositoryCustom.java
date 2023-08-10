package codi.backend.domain.schedule.repository;

import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.schedule.dto.ScheduleDto;

import java.time.LocalDate;

public interface ScheduleRepositoryCustom {
    ScheduleDto.ScheduleDailyResponse findDailySchedules(Mentor mentor, LocalDate date);
    ScheduleDto.ScheduleMonthlyResponse findMonthlySchedules(Mentor mentor, LocalDate month);
}
