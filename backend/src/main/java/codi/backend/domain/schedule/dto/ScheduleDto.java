package codi.backend.domain.schedule.dto;

import com.querydsl.core.annotations.QueryProjection;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.util.List;

public class ScheduleDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Put {
        @NotBlank(message = "날짜를 입력해주세요.")
        @Pattern(regexp = "^[0-9]{4}/[0-9]{2}/[0-9]{2}$", message = "날짜는 다음과 같은 형태만 가능합니다: yyyy/mm/dd")
        @ApiModelProperty(example = "날짜 yyyy/mm/dd")
        private String date;

        @Valid
        @ApiModelProperty(example = "시간을 리스트 형태로 입력해야 합니다. \"times\": [ ]")
        private List<TimeConstraint> times;
    }

    @Getter
    @Setter
    public static class TimeConstraint {
        @NotBlank(message = "시간을 입력해주세요.")
        @Pattern(regexp = "^[0-9]{2}:[0-9]{2} - [0-9]{2}:[0-9]{2}$", message = "시간은 다음과 같은 형태만 가능합니다: hh:mm - hh:mm")
        @ApiModelProperty(example = "시간 { \"time\": \"hh:mm - hh:mm\" }, ...")
        private String time;
    }

    @Getter
    @Setter
    public static class DailyRequest {
        @NotBlank(message = "날짜를 입력해주세요.")
        @Pattern(regexp = "^[0-9]{4}/[0-9]{2}/[0-9]{2}$", message = "날짜는 다음과 같은 형태만 가능합니다: yyyy/mm/dd")
        @ApiModelProperty(example = "날짜 yyyy/mm/dd")
        private String date;
    }

    @Getter
    @Setter
    public static class MonthlyRequest {
        @NotBlank(message = "년, 월을 입력해주세요.")
        @Pattern(regexp = "^[0-9]{4}/[0-9]{2}$", message = "년, 월은 다음과 같은 형태만 가능합니다: yyyy/mm")
        @ApiModelProperty(example = "날짜 yyyy/mm")
        private String month;
    }

    @Getter
    @Builder
    public static class ScheduleMonthlyResponse {
        private String month;
        private List<ScheduleDailyResponse> days;
    }

    @Getter
    @Builder
    public static class ScheduleDailyResponse {
        private String date;
        private List<ScheduleTimeResponse> times;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class ScheduleTimeResponse {
        private String time;
        private Boolean enabled;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class ScheduleInfo {
        private Long id;
        private LocalDateTime startDateTime;
        private LocalDateTime endDateTime;
        private Long mentorId;
        private Long mentoringId;

        @QueryProjection
        public ScheduleInfo(Long id, LocalDateTime startDateTime, LocalDateTime endDateTime, Long mentorId, Long mentoringId) {
            this.id = id;
            this.startDateTime = startDateTime;
            this.endDateTime = endDateTime;
            this.mentorId = mentorId;
            this.mentoringId = mentoringId;
        }
    }
}
