package codi.backend.domain.mentoring.dto;

import codi.backend.domain.mentoring.entity.Mentoring;
import codi.backend.domain.schedule.dto.ScheduleDto;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class MentoringDto {

    @Getter
    public static class MentoringPost {
        @NotBlank(message = "멘토링 신청 날짜는 공백일 수 없습니다.")
        @Pattern(regexp = "^\\d{4}/(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])$", message = "멘토링 날짜의 형식은 yyyy/mm/dd 이어야 합니다.")
        private String date;

        @NotBlank(message = "멘토링 신청 시간은 공백일 수 없습니다.")
        @Pattern(regexp = "^([01]\\d|2[0-3]):([0-5]\\d) - ([01]\\d|2[0-3]):([0-5]\\d)$", message = "멘토링 시간의 형식은 hh:mm - hh:mm 이어야 합니다.")
        private String time;

        @NotBlank(message = "멘토링 신청 사유를 최소 50자 이상 필수로 작성해야 합니다. ")
        @Size(min = 50)
        private String applicationReason;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MentoringResponse {
        private Long id;
        private Mentoring.MentoringStatus status;
        private String applicationReason;
        private ScheduleDto.ScheduleResponse scheduleResponse;
    }
}
