package codi.backend.domain.schedule.service;

import codi.backend.domain.schedule.dto.ScheduleDto;

public interface ScheduleService {
    void registerSchedule(Long mentorId, ScheduleDto.SchedulePostDto schedule);
}
