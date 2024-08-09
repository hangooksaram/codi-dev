package codi.backend.domain.mentor.dto;

import codi.backend.domain.mentor.entity.Mentor;
import com.querydsl.core.annotations.QueryProjection;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

public class MentorDto {
    @Getter
    @Builder
    public static class MentorPost {
        @NotBlank
        @Schema(example = "직무 경력")
        private String career;

        @NotBlank
        @Schema(example = "직무")
        private String job;

        @Schema(example = "멘토 소개")
        private String introduction;

        @NotNull
        @NotEmpty
        @Size(min = 1, max = 4)
        @Schema(example = "멘토링 분야")
        private List<Mentor.MentoringCategory> mentoringCategories;
    }

    @Getter
    @Builder
    public static class MentorPatch {
        @Schema(example = "직무 경력")
        private String career;

        @Schema(example = "직무")
        private String job;

        @Schema(example = "멘토 소개")
        private String introduction;

        @Size(min = 1, max = 4)
        @Schema(example = "멘토링 분야")
        private List<Mentor.MentoringCategory> mentoringCategories;
    }

    @Schema(description = "멘토 정보 응답 DTO")
    @Getter
    @Setter
    @Builder
    public static class MentorResponse {
        @Schema(example = "멘토 아이디")
        private Long id;

        @Schema(example = "별명")
        private String nickname;

        @Schema(example = "프로필 이미지")
        private String imgUrl;

        @Schema(example = "장애 구분")
        private String disability;

        @Schema(example = "중증도")
        private String severity;

        @Schema(example = "직무 경력")
        private String career;

        @Schema(example = "직무")
        private String job;

        @Schema(example = "멘토 소개")
        private String introduction;

        @Schema(example = "별점")
        private Double star;

        @Schema(example = "수강한 멘토 수")
        private Integer mentees;

        @Schema(example = "멘토링 분야")
        private List<String> mentoringCategories;

        @Schema(example = "진행한 총 멘토링 수")
        private Integer mentoringCount;

        @Schema(example = "응답률")
        private Double responseRate;

        @Schema(name = "mentoringCount", example = "예정된 스케줄 수")
        private Integer futureScheduleCount;
    }

    @Getter
    @Builder
    public static class SearchMentorRequest {
        @Schema(example = "장애 구분")
        private String disability;

        @Schema(example = "직무")
        private String job;

        @Schema(example = "직무 경력")
        private String career;

        @Schema(example = "키워드(직무, 소개)")
        private String keyword;
    }

    @Getter
    @Builder
    public static class RecommendationMentorRequest {
        @Schema(example = "장애 구분")
        private String disability;

        @Schema(example = "직무 1위")
        private String firstJob;

        @Schema(example = "직무 2위")
        private String secondJob;

        @Schema(example = "직무 3위")
        private String thirdJob;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @Builder
    public static class IntermediateMentorResponse {
        @Schema(example = "멘토 ID")
        private Long mentorId;

        @Schema(example = "별명")
        private String nickname;

        @Schema(example = "프로필 이미지")
        private String imgUrl;

        @Schema(example = "직무 경력")
        private String career;

        @Schema(example = "직무")
        private String job;

        @Schema(example = "장애 구분")
        private String disability;

        @Schema(example = "중증도")
        private String severity;

        @Schema(example = "별점")
        private Double star;

        @Schema(example = "수강한 멘토 수")
        private Integer mentees;

        @QueryProjection
        public IntermediateMentorResponse(Long mentorId, String nickname, String imgUrl, String career, String job, String disability, String severity, Double star, Integer mentees) {
            this.mentorId = mentorId;
            this.nickname = nickname;
            this.imgUrl = imgUrl;
            this.career = career;
            this.job = job;
            this.disability = disability;
            this.severity = severity;
            this.star = star;
            this.mentees = mentees;
        }
    }

    @Schema(description = "멘토 검색 결과 응답 DTO")
    @Getter
    @Setter
    @NoArgsConstructor
    @Builder
    public static class MentorProfileResponse {
        @Schema(example = "멘토 ID")
        private Long mentorId;

        @Schema(example = "별명")
        private String nickname;

        @Schema(example = "프로필 이미지")
        private String imgUrl;

        @Schema(example = "직무 경력")
        private String career;

        @Schema(example = "멘토의 현재 직무")
        private String job;

        @Schema(example = "장애 구분")
        private String disability;

        @Schema(example = "중증도")
        private String severity;

        @Schema(example = "별점")
        private Double star;

        @Schema(example = "수강한 멘토 수")
        private Integer mentees;

        @QueryProjection
        public MentorProfileResponse(Long mentorId, String nickname, String imgUrl, String career, String job, String disability, String severity, Double star, Integer mentees) {
            this.mentorId = mentorId;
            this.nickname = nickname;
            this.imgUrl = imgUrl;
            this.career = career;
            this.job = job;
            this.disability = disability;
            this.severity = severity;
            this.star = star;
            this.mentees = mentees;
        }
    }
}
