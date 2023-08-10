package codi.backend.domain.mentoring.dto;

import codi.backend.domain.schedule.dto.ScheduleDto;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.*;

public class MentoringDto {

    @Getter
    public static class MentoringPost {
        @NotBlank(message = "멘토링 신청 날짜는 공백일 수 없습니다.")
        @Pattern(regexp = "^\\d{4}/(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])$", message = "멘토링 날짜의 형식은 yyyy/mm/dd 이어야 합니다.")
        @ApiModelProperty(example = "날짜: yyyy/mm/dd")
        private String date;

        @NotBlank(message = "멘토링 신청 시간은 공백일 수 없습니다.")
        @Pattern(regexp = "^([01]\\d|2[0-3]):([0-5]\\d) - ([01]\\d|2[0-3]):([0-5]\\d)$", message = "멘토링 시간의 형식은 hh:mm - hh:mm 이어야 합니다.")
        @ApiModelProperty(example = "시간: hh:mm - hh:mm")
        private String time;

        @NotBlank(message = "멘토링 신청 사유를 최소 50자 이상 필수로 작성해야 합니다. ")
        @Size(min = 50)
        @ApiModelProperty(example = "신청 사유")
        private String applicationReason;
    }

    @Getter
    public static class RateMentorRequest {
        @NotNull
        @ApiModelProperty(example = "프로필 ID")
        private Long profileId;

        @NotNull
        @ApiModelProperty(example = "멘토링 ID")
        private Long mentoringId;

        @NotNull
        @ApiModelProperty(example = "멘토 ID")
        private Long mentorId;

        @NotNull
        @DecimalMax(value = "5.0")
        @DecimalMin(value = "0.0")
        @ApiModelProperty(example = "별점")
        private Double star;
    }

    @Getter
    public static class MentoringLinkRequest {
        @NotNull
        @ApiModelProperty(example = "링크")
        private String link;

        @NotNull
        @ApiModelProperty(example = "멘토링 플랫폼")
        private String platform;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MentoringResponse {
        private Long id;
        private String status;
        private String applicationReason;
        private Double rating;
        private ScheduleDto.ScheduleDailyResponse scheduleResponse;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MentoringApplicationResponse {
        private Long id;
        private String name;
        private String employmentStatus;
        private String disability;
        private String severity;
        private String applicationDate;
        private String applicationReason;

    }
}
