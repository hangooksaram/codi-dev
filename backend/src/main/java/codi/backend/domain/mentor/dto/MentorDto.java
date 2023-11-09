package codi.backend.domain.mentor.dto;

import codi.backend.domain.mentor.entity.Mentor;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import javax.validation.constraints.*;
import java.util.List;

public class MentorDto {
    @Getter
    @Builder
    public static class MentorPost {
        @NotBlank
        @ApiModelProperty(example = "직무")
        private String job;

        @NotBlank
        @ApiModelProperty(example = "회사 이름")
        private String company;

        @NotBlank
        @ApiModelProperty(example = "프로필에 표시될 직무명")
        private String jobName;

        @NotBlank
        @ApiModelProperty(example = "경력")
        private String career;

        @NotNull
        @ApiModelProperty(example = "재직중 여부")
        private Boolean inOffice;

        @NotNull
        @NotEmpty
        @Size(min = 1, max = 4)
        @ApiModelProperty(example = "멘토링 분야")
        private List<Mentor.MentoringCategory> mentoringCategories;

        @ApiModelProperty(example = "멘토 소개")
        private String introduction;
    }

    @Getter
    @Builder
    public static class MentorPatch {
        @NotBlank
        @ApiModelProperty(example = "직무")
        private String job;

        @NotBlank
        @ApiModelProperty(example = "회사 이름")
        private String company;

        @NotBlank
        @ApiModelProperty(example = "프로필에 표시될 직무명")
        private String jobName;

        @NotBlank
        @ApiModelProperty(example = "경력")
        private String career;

        @NotNull
        @ApiModelProperty(example = "재직중 여부")
        private Boolean inOffice;

        @ApiModelProperty(example = "멘토 소개")
        private String introduction;

        @NotNull
        @NotEmpty
        @Size(min = 1, max = 4)
        @ApiModelProperty(example = "멘토링 분야")
        private List<Mentor.MentoringCategory> mentoringCategories;
    }

    @Schema(description = "멘토 정보 응답 DTO")
    @Getter
    @Builder
    public static class MentorResponse {
        @ApiModelProperty(example = "멘토 아이디")
        private Long id;

        @ApiModelProperty(example = "이름")
        private String name;

        @ApiModelProperty(example = "나이")
        private Integer age;

        @ApiModelProperty(example = "프로필 이미지")
        private String imgUrl;

        @ApiModelProperty(example = "장애 구분")
        private String disability;

        @ApiModelProperty(example = "중증도")
        private String severity;

        @ApiModelProperty(example = "최종 학력")
        private String education;

        @ApiModelProperty(example = "재직증명서 링크")
        private String fileUrl;

        @ApiModelProperty(example = "재직증명서 제출 여부")
        private Boolean isCertificate;

        @ApiModelProperty(example = "회사 이름")
        private String company;

        @ApiModelProperty(example = "직무")
        private String job;

        @ApiModelProperty(example = "경력")
        private String career;

        @ApiModelProperty(example = "프로필에 표시될 직무명")
        private String jobName;

        @ApiModelProperty(example = "재직중 여부")
        private Boolean inOffice;

        @ApiModelProperty(example = "멘토 소개")
        private String introduction;

        @ApiModelProperty(example = "별점")
        private Double star;

        @ApiModelProperty(example = "수강한 멘토 수")
        private Integer mentees;

        @ApiModelProperty(example = "멘토링 분야")
        private List<String> mentoringCategories;
    }

    @Getter
    @Builder
    public static class RecommendationMentorRequest {
        @ApiModelProperty(example = "장애 구분")
        private String disability;

        @ApiModelProperty(example = "직무 1위")
        private String firstJob;

        @ApiModelProperty(example = "직무 2위")
        private String secondJob;

        @ApiModelProperty(example = "직무 3위")
        private String thirdJob;
    }

    @Getter
    @AllArgsConstructor
    public static class IntermediateMentorResponse {
        @ApiModelProperty(example = "회원 ID")
        private String id;

        @ApiModelProperty(example = "멘토 ID")
        private Long mentorId;

        @ApiModelProperty(example = "프로필 이미지")
        private String imgUrl;

        @ApiModelProperty(example = "재직증명서 제출 여부")
        private Boolean isCertificate;

        @ApiModelProperty(example = "이름")
        private String name;

        @ApiModelProperty(example = "직무")
        private String job;

        @ApiModelProperty(example = "프로필에 표시될 직무명")
        private String jobName;

        @ApiModelProperty(example = "재직중 표시")
        private Boolean inOffice;

        @ApiModelProperty(example = "경력")
        private String career;

        @ApiModelProperty(example = "장애 구분")
        private String disability;

        @ApiModelProperty(example = "중증도")
        private String severity;

        @ApiModelProperty(example = "별점")
        private Double star;

        @ApiModelProperty(example = "수강한 멘토 수")
        private Integer mentees;
    }

    @Schema(description = "멘토 검색 결과 응답 DTO")
    @Getter
    @Builder
    public static class SearchMentorResponse {
        @ApiModelProperty(example = "회원 ID")
        private String id;

        @ApiModelProperty(example = "멘토 ID")
        private Long mentorId;

        @ApiModelProperty(example = "프로필 이미지")
        private String imgUrl;

        @ApiModelProperty(example = "재직증명서 제출 여부")
        private Boolean isCertificate;

        @ApiModelProperty(example = "이름")
        private String name;

        @ApiModelProperty(example = "직무")
        private String job;

        @ApiModelProperty(example = "프로필에 표시될 직무명")
        private String jobName;

        @ApiModelProperty(example = "경력")
        private String career;

        @ApiModelProperty(example = "장애 구분")
        private String disability;

        @ApiModelProperty(example = "중증도")
        private String severity;

        @ApiModelProperty(example = "별점")
        private Double star;

        @ApiModelProperty(example = "수강한 멘토 수")
        private Integer mentees;
    }
}
