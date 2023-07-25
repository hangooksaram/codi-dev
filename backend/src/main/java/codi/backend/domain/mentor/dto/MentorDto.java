package codi.backend.domain.mentor.dto;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import javax.validation.constraints.NotBlank;

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
        @ApiModelProperty(example = "경력")
        private String career;

        @NotBlank
        @ApiModelProperty(example = "재직중 여부")
        private Boolean inOffice;

        @ApiModelProperty(example = "멘토 소개")
        private String introduction;
    }

    @Getter
    @Builder
    public static class MentorPatch {

        @ApiModelProperty(example = "직무")
        private String job;

        @ApiModelProperty(example = "경력")
        private String career;

        @ApiModelProperty(example = "회사 이름")
        private String company;

        @ApiModelProperty(example = "재직중 여부")
        private Boolean inOffice;

        @ApiModelProperty(example = "멘토 소개")
        private String introduction;
    }

    @Schema(description = "멘토 정보 응답 DTO")
    @Getter
    @Builder
    public static class MentorResponse {
        @ApiModelProperty(example = "멘토 아이디")
        private Long id;

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

        @ApiModelProperty(example = "재직중 여부")
        private Boolean inOffice;

        @ApiModelProperty(example = "멘토 소개")
        private String introduction;

        @ApiModelProperty(example = "별점")
        private Double star;

        @ApiModelProperty(example = "수강한 멘토 수")
        private Integer mentees;
    }

    @Schema(description = "멘토 검색 결과 응답 DTO")
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
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
