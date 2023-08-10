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

        return MentoringDto.MentoringResponse.builder()
                .id(mentoring.getId())
                .status(mentoring.getMentoringStatus().getStatus())
                .applicationReason(mentoring.getApplicationReason())
                .rating(mentoring.getRating())
                .scheduleResponse(null)
                .build();
    }
}
