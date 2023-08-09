package codi.backend.domain.mentoring.mapper;

import codi.backend.domain.mentoring.dto.MentoringDto;
import codi.backend.domain.schedule.dto.ScheduleDto;
import codi.backend.domain.mentoring.entity.Mentoring;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MentoringMapper {
    default MentoringDto.MentoringResponse mentoringToMentoringResponse(Mentoring mentoring) {
        if (mentoring == null) {
            return null;
        }

        ScheduleDto.ScheduleResponse scheduleResponse = ScheduleDto.ScheduleResponse.builder()
                .id(mentoring.getSchedule().getId())
                .startDateTime(mentoring.getSchedule().getStartDateTime())
                .endDateTime(mentoring.getSchedule().getEndDateTime())
                .build();

        return MentoringDto.MentoringResponse.builder()
                .id(mentoring.getId())
                .status(mentoring.getStatus().getStatus())
                .applicationReason(mentoring.getApplicationReason())
                .rating(mentoring.getRating())
                .scheduleResponse(scheduleResponse)
                .build();
    }
}
