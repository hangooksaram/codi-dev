package codi.backend.domain.mentoring.dto;

import codi.backend.domain.mentor.dto.MentorDto;
import codi.backend.domain.mentoring.entity.Mentoring;
import com.querydsl.core.annotations.QueryProjection;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import javax.validation.constraints.*;
import java.util.List;

public class MentoringDto {

    @Getter
    public static class MentoringPost {
        @NotBlank(message = "멘토링 신청 날짜는 공백일 수 없습니다.")
        @Pattern(regexp = "^\\d{4}/(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])$", message = "멘토링 날짜의 형식은 yyyy/mm/dd 이어야 합니다.")
        @Schema(example = "yyyy/mm/dd")
        private String date;

        @NotBlank(message = "멘토링 신청 시간은 공백일 수 없습니다.")
        @Pattern(regexp = "^([01]\\d|2[0-3]):([0-5]\\d) - ([01]\\d|2[0-3]):([0-5]\\d)$", message = "멘토링 시간의 형식은 hh:mm - hh:mm 이어야 합니다.")
        @Schema(example = "hh:mm - hh:mm")
        private String time;

        @NotBlank(message = "멘토링 신청 사유를 최소 50자 이상 필수로 작성해야 합니다. ")
        @Size(min = 50)
        @Schema(example = "신청 사유")
        private String applicationReason;
    }

    @Getter
    public static class RateMentorRequest {
        @NotNull
        @Schema(example = "프로필 ID")
        private Long profileId;

        @NotNull
        @Schema(example = "멘토링 ID")
        private Long mentoringId;

        @NotNull
        @Schema(example = "멘토 ID")
        private Long mentorId;

        @NotNull
        @DecimalMax(value = "5.0")
        @DecimalMin(value = "0.0")
        @Schema(example = "별점")
        private Double star;
    }

    @Getter
    public static class MentoringLinkRequest {
        @NotNull
        @Schema(example = "링크")
        private String link;

        @NotNull
        @Schema(example = "멘토링 플랫폼")
        private String platform;
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

    // Mentor가 Mentees 정보 조회
    @Getter
    @Builder
    public static class MentoringMonthlyMenteesResponse {
        @Schema(example = "yyyy/mm")
        private String month;

        private List<MentoringDailyMenteesResponse> monthlyMentoringMembers;
    }

    @Getter
    @Builder
    public static class MentoringMonthlyMentorsResponse {
        @Schema(example = "yyyy/mm")
        private String month;

        private List<MentoringDailyMentorsResponse> monthlyMentoringMembers;
    }

    @Getter
    @Builder
    public static class MentoringDailyMenteesResponse {
        @Schema(example = "yyyy/mm/dd")
        private String date;

        List<MenteeInfoResponse> mentoringMembers;

        @Schema(example = "멘토링 상태")
        private String mentoringStatus;
    }

    @Getter
    @Builder
    public static class MentoringDailyMentorsResponse {
        @Schema(example = "yyyy/mm/dd")
        private String date;

        List<MentorInfoResponse> mentoringMembers;

        @Schema(example = "멘토링 상태")
        private String mentoringStatus;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class MenteeInfoResponse {
        @Schema(example = "멘토링 아이디")
        private Long mentoringId;

        @Schema(example = "프로필 아이디")
        private Long profileId;

        @Schema(example = "hh:mm - hh:mm")
        private String time;

        @Schema(example = "별명")
        private String nickname;

        @Schema(example = "프로필 이미지")
        private String imgUrl;

        @Schema(example = "직무")
        private String mentoringJob;

        @Schema(example = "플랫폼 사이트 링크")
        private String link;

        @Schema(example = "플랫폼 종류")
        private String platform;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class MentorInfoResponse {
        @Schema(example = "멘토링 아이디")
        private Long mentoringId;

        @Schema(example = "멘토 아이디")
        private Long mentorId;

        @Schema(example = "hh:mm - hh:mm")
        private String time;

        @Schema(example = "별명")
        private String nickname;

        @Schema(example = "프로필 이미지")
        private String imgUrl;

        @Schema(example = "직무")
        private String mentoringJob;

        @Schema(example = "플랫폼 사이트 링크")
        private String link;

        @Schema(example = "플랫폼 종류")
        private String platform;
    }

    // 멘토 신청 내역 조회
    @Getter
    @AllArgsConstructor
    @Builder
    public static class MentoringApplicationResponse {
        @Schema(example = "멘토링 아이디")
        private Long mentoringId;

        private MentoringApplicationMenteeInfoResponse menteeInfo;

        @Schema(example = "yyyy/mm/dd (요일) hh:mm - hh:mm")
        private String applicationDate;

        @Schema(example = "신청 사유")
        private String applicationReason;

        @Schema(example = "멘토링 상태")
        private String mentoringStatus;

        @Schema(example = "멘토링 날짜 확인")
        private Boolean isDatePassed;
    }

    @Getter
    @Builder
    public static class MentoringApplicationMenteeInfoResponse {
        @Schema(example = "프로필 아이디")
        private Long profileId;

        @Schema(example = "별명")
        private String nickname;

        @Schema(example = "프로필 이미지 url")
        private String imgUrl;

        @Schema(example = "희망 직무")
        private String desiredJob;

        @Schema(example = "장애 구분")
        private String disability;

        @Schema(example = "중증도")
        private String severity;

        @Schema(example = "멘티의 현재 상태")
        private String employmentStatus;
    }

    // 멘토링 일정 (오늘 날짜)
    @Getter
    @Builder
    public static class TodayMentoringInfoResponse {
        @Schema(example = "yyyy/mm/dd (요일) hh:mm - hh:mm")
        private String applicationDate;

        private MentorDto.MentorProfileResponse mentorInfo;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class MentoringInfo {
        private Long id;
        private Mentoring.MentoringStatus mentoringStatus;
        private Long mentorId;
        private Long profileId;
        private Long scheduleId;

        @QueryProjection
        public MentoringInfo(Long id, Mentoring.MentoringStatus mentoringStatus, Long mentorId, Long profileId, Long scheduleId) {
            this.id = id;
            this.mentoringStatus = mentoringStatus;
            this.mentorId = mentorId;
            this.profileId = profileId;
            this.scheduleId = scheduleId;
        }
    }
}
