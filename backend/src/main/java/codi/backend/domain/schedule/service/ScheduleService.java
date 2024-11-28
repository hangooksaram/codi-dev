package codi.backend.domain.schedule.service;

import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.schedule.dto.ScheduleDto;
import codi.backend.domain.schedule.entity.Schedule;

import java.time.LocalDateTime;

public interface ScheduleService {
    void updateSchedule(Long mentorId, ScheduleDto.SchedulePut schedulePutDto);
    Schedule findSchedule(Mentor mentor, LocalDateTime startTime, LocalDateTime endTime);
    ScheduleDto.ScheduleDailyResponse findDailySchedules(Long profileId, Long mentorId, String date);
    ScheduleDto.ScheduleMonthlyResponse findMonthlySchedules(Long profileId, Long mentorId, String month);
}
