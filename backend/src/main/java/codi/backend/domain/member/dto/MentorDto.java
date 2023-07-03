package codi.backend.domain.member.dto;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;

public class MentorDto {

    @Getter
    @Builder
    public static class MentorPost {
//        @NotBlank
//        @ApiModelProperty(example = "멘토 아이디")
//        private Long id;

        @ApiModelProperty(example = "재직증명서 링크")
        private String fileUrl;

        @ApiModelProperty(example = "직무")
        private String job;

        @ApiModelProperty(example = "회사 이름")
        private String company;

        @ApiModelProperty(example = "멘토 소개")
        private String introduction;
    }

    @Schema(description = "멘토정보 응답 DTO")
    @Getter
    @Builder
    public static class MentorResponse {
        @ApiModelProperty(example = "멘토 아이디")
        private Long id;

        @ApiModelProperty(example = "재직증명서 링크")
        private String fileUrl;

        @ApiModelProperty(example = "직무")
        private String job;

        @ApiModelProperty(example = "회사 이름")
        private String company;

        @ApiModelProperty(example = "멘토 소개")
        private String introduction;
    }
}
