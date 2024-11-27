package codi.backend.domain.schedule.dto;

import com.querydsl.core.annotations.QueryProjection;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.util.List;

public class ScheduleDto {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SchedulePut {
        @NotBlank(message = "날짜를 입력해주세요.")
        @Pattern(regexp = "^[0-9]{4}/[0-9]{2}/[0-9]{2}$", message = "날짜는 다음과 같은 형태만 가능합니다: yyyy/mm/dd")
        @Schema(example = "yyyy/mm/dd")
        private String date;

        @Valid
        @Schema(example =
                "{\n" +
                "    \"date\": \"yyyy/mm//dd\",\n" +
                "    \"times\": [\n" +
                "        {\n" +
                "            \"time\": \"hh:mm - hh:mm\"\n" +
                "        }\n" +
                "    ]\n" +
                "}")
        private List<TimeConstraint> times;
    }

    @Getter
    @Setter
    public static class TimeConstraint {
        @NotBlank(message = "시간을 입력해주세요.")
        @Pattern(regexp = "^[0-9]{2}:[0-9]{2} - [0-9]{2}:[0-9]{2}$", message = "시간은 다음과 같은 형태만 가능합니다: hh:mm - hh:mm")
        @Schema(example = "시간 { \"time\": \"hh:mm - hh:mm\" }, ...")
        private String time;
    }

    @Getter
    @Setter
    public static class DailyRequest {
        @NotBlank(message = "날짜를 입력해주세요.")
        @Pattern(regexp = "^[0-9]{4}/[0-9]{2}/[0-9]{2}$", message = "날짜는 다음과 같은 형태만 가능합니다: yyyy/mm/dd")
        @Schema(example = "yyyy/mm/dd")
        private String date;
    }

    @Getter
    @Setter
    public static class MonthlyRequest {
        @NotBlank(message = "년, 월을 입력해주세요.")
        @Pattern(regexp = "^[0-9]{4}/[0-9]{2}$", message = "년, 월은 다음과 같은 형태만 가능합니다: yyyy/mm")
        @Schema(example = "yyyy/mm")
        private String month;
    }

    @Getter
    @NoArgsConstructor
    @Builder
    public static class ScheduleMonthlyResponse {
        @Schema(example = "yyyy/mm")
        private String month;

        private List<ScheduleDailyResponse> days;

        @QueryProjection
        public ScheduleMonthlyResponse(String month, List<ScheduleDailyResponse> days) {
            this.month = month;
            this.days = days;
        }
    }

    @Getter
    @Builder
    public static class ScheduleDailyResponse {
        @Schema(example = "yyyy/mm/dd")
        private String date;

        private List<ScheduleTimeResponse> times;

        @QueryProjection
        public ScheduleDailyResponse(String date, List<ScheduleTimeResponse> times) {
            this.date = date;
            this.times = times;
        }
    }

    @Getter
    @Builder
    public static class ScheduleTimeResponse {
        @Schema(example = "hh:mm - hh:mm")
        private String time;

        @Schema(example = "이용 가능 여부")
        private Boolean enabled;

        @QueryProjection
        public ScheduleTimeResponse(String time, Boolean enabled) {
            this.time = time;
            this.enabled = enabled;
        }
    }

    @Getter
    @Builder
    public static class ScheduleTempInfo {
        private LocalDateTime startDateTime;
        private LocalDateTime endDateTime;
        private Boolean enabled;

        @QueryProjection
        public ScheduleTempInfo(LocalDateTime startDateTime, LocalDateTime endDateTime, Boolean enabled) {
            this.startDateTime = startDateTime;
            this.endDateTime = endDateTime;
            this.enabled = enabled;
        }
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
