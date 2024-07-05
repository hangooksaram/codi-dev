package codi.backend.domain.mentor.dto;

import codi.backend.domain.mentor.entity.Mentor;
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
        @Schema(example = "직무")
        private String job;

        @NotBlank
        @Schema(example = "회사 이름")
        private String company;

        @NotBlank
        @Schema(example = "프로필에 표시될 직무명")
        private String jobName;

        @NotBlank
        @Schema(example = "경력")
        private String career;

        @NotNull
        @Schema(example = "재직중 여부")
        private Boolean inOffice;

        @NotNull
        @NotEmpty
        @Size(min = 1, max = 4)
        @Schema(example = "멘토링 분야")
        private List<Mentor.MentoringCategory> mentoringCategories;

        @Schema(example = "멘토 소개")
        private String introduction;
    }

    @Getter
    @Builder
    public static class MentorPatch {
        @Schema(example = "직무")
        private String job;

        @Schema(example = "회사 이름")
        private String company;

        @Schema(example = "프로필에 표시될 직무명")
        private String jobName;

        @Schema(example = "경력")
        private String career;

        @Schema(example = "재직중 여부")
        private Boolean inOffice;

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

        @Schema(example = "이름")
        private String name;

        @Schema(example = "나이")
        private Integer age;

        @Schema(example = "프로필 이미지")
        private String imgUrl;

        @Schema(example = "장애 구분")
        private String disability;

        @Schema(example = "중증도")
        private String severity;

        @Schema(example = "최종 학력")
        private String education;

        @Schema(example = "재직증명서 링크")
        private String fileUrl;

        @Schema(example = "재직증명서 제출 여부")
        private Boolean isCertificate;

        @Schema(example = "회사 이름")
        private String company;

        @Schema(example = "직무")
        private String job;

        @Schema(example = "경력")
        private String career;

        @Schema(example = "프로필에 표시될 직무명")
        private String jobName;

        @Schema(example = "재직중 여부")
        private Boolean inOffice;

        @Schema(example = "멘토 소개")
        private String introduction;

        @Schema(example = "별점")
        private Double star;

        @Schema(example = "수강한 멘토 수")
        private Integer mentees;

        @Schema(example = "멘토링 분야")
        private List<String> mentoringCategories;

        @Schema(example = "0")
        private Integer mentoringCount;

        @Schema(example = "0.0")
        private Double responseRate;

        @Schema(name = "mentoringCount", example = "예정된 스케줄 수")
        private Integer futureScheduleCount;
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
    @AllArgsConstructor
    public static class IntermediateMentorResponse {
        @Schema(example = "회원 ID")
        private String id;

        @Schema(example = "멘토 ID")
        private Long mentorId;

        @Schema(example = "프로필 이미지")
        private String imgUrl;

        @Schema(example = "재직증명서 제출 여부")
        private Boolean isCertificate;

        @Schema(example = "이름")
        private String name;

        @Schema(example = "직무")
        private String job;

        @Schema(example = "프로필에 표시될 직무명")
        private String jobName;

        @Schema(example = "재직중 표시")
        private Boolean inOffice;

        @Schema(example = "경력")
        private String career;

        @Schema(example = "장애 구분")
        private String disability;

        @Schema(example = "중증도")
        private String severity;

        @Schema(example = "별점")
        private Double star;

        @Schema(example = "수강한 멘토 수")
        private Integer mentees;
    }

    @Schema(description = "멘토 검색 결과 응답 DTO")
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SearchMentorResponse {
        @Schema(example = "회원 ID")
        private String id;

        @Schema(example = "멘토 ID")
        private Long mentorId;

        @Schema(example = "프로필 이미지")
        private String imgUrl;

        @Schema(example = "재직증명서 제출 여부")
        private Boolean isCertificate;

        @Schema(example = "이름")
        private String name;

        @Schema(example = "직무")
        private String job;

        @Schema(example = "프로필에 표시될 직무명")
        private String jobName;

        @Schema(example = "경력")
        private String career;

        @Schema(example = "장애 구분")
        private String disability;

        @Schema(example = "중증도")
        private String severity;

        @Schema(example = "별점")
        private Double star;

        @Schema(example = "수강한 멘토 수")
        private Integer mentees;
    }
}
