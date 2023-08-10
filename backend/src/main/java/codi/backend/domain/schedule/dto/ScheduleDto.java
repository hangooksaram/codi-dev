package codi.backend.domain.schedule.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.List;

public class ScheduleDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SchedulePostDto {
        @NotBlank(message = "날짜를 입력해주세요.")
        @Pattern(regexp = "^[0-9]{4}/[0-9]{2}/[0-9]{2}$", message = "날짜는 다음과 같은 형태만 가능합니다: yyyy/hh/dd")
        @ApiModelProperty(example = "날짜 yyyy/mm/dd")
        private String date;

        @NotBlank(message = "시간 목록을 입력해주세요.")
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
    public static class DailyRequest {
        @NotBlank(message = "날짜를 입력해주세요.")
        @Pattern(regexp = "^[0-9]{4}/[0-9]{2}/[0-9]{2}$", message = "날짜는 다음과 같은 형태만 가능합니다: yyyy/hh/dd")
        @ApiModelProperty(example = "날짜 yyyy/mm/dd")
        private String date;
    }

    @Getter
    public static class MonthlyRequest {
        @NotBlank(message = "년, 월을 입력해주세요.")
        @Pattern(regexp = "^[0-9]{4}/[0-9]{2}$", message = "년, 월은 다음과 같은 형태만 가능합니다: yyyy/hh")
        private String month;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ScheduleMonthlyResponse {
        private String month;
        private List<ScheduleDailyResponse> days;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ScheduleDailyResponse {
        private String date;
        private List<ScheduleTimeResponse> times;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ScheduleTimeResponse {
        private String time;
        private Boolean enabled;
    }
}
