package codi.backend.domain.mentoring.dto;

import codi.backend.domain.mentor.dto.MentorDto;
import codi.backend.domain.mentoring.entity.Mentoring;
import codi.backend.domain.schedule.dto.ScheduleDto;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.*;
import java.util.List;

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
        private String month;
    }

    // Mentor가 Mentees 정보 조회
    @Getter
    @Builder
    public static class MentoringMonthlyMenteesResponse {
        private String month;
        private List<MentoringDailyMenteesResponse> monthlyMentoringMembers;
    }

    @Getter
    @Builder
    public static class MentoringMonthlyMentorsResponse {
        private String month;
        private List<MentoringDailyMentorsResponse> monthlyMentoringMembers;
    }

    @Getter
    @Builder
    public static class MentoringDailyMenteesResponse {
        private String date;
        List<MenteeInfoResponse> mentoringMembers;
        private String mentoringStatus;
    }

    @Getter
    @Builder
    public static class MentoringDailyMentorsResponse {
        private String date;
        List<MentorInfoResponse> mentoringMembers;
        private String mentoringStatus;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class MenteeInfoResponse {
        private Long mentoringId;
        private Long profileId;
        private String time;
        private String name;
        private String imgUrl;
        private String mentoringJob;
        private String link;
        private String platform;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class MentorInfoResponse {
        private Long mentoringId;
        private Long mentorId;
        private String time;
        private String name;
        private String imgUrl;
        private String mentoringJob;
        private String link;
        private String platform;
    }

    // 멘토 신청 내역 조회
    @Getter
    @AllArgsConstructor
    @Builder
    public static class MentoringApplicationResponse {
        private Long mentoringId;
        private MentoringApplicationMenteeInfoResponse menteeInfo;
        private String applicationDate;
        private String applicationReason;
    }

    @Getter
    @Builder
    public static class MentoringApplicationMenteeInfoResponse {
        private Long profileId;
        private String name;
        private String imgUrl;
        private String employmentStatus;
        private String desiredJob;
        private String disability;
        private String severity;
    }

    // 멘토링 일정 (오늘 날짜)
    @Getter
    @Builder
    public static class TodayMentoringInfoResponse {
        private String applicationDate;
        private MentorDto.SearchMentorResponse mentorInfo;
    }
}
