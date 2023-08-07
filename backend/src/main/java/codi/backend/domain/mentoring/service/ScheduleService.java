package codi.backend.domain.mentoring.service;

import codi.backend.domain.mentoring.dto.ScheduleDto;
import codi.backend.domain.mentoring.entity.Schedule;

public interface ScheduleService {
    void registerSchedule(Long mentorId, ScheduleDto.SchedulePostDto schedule);
}
