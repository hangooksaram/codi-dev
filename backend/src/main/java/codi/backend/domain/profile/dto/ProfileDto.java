package codi.backend.domain.profile.dto;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

public class ProfileDto {

    @Getter
    @Builder
    public static class ProfilePost {

        @NotBlank
        @ApiModelProperty(example = "희망 직무")
        private String desiredJob;

        @ApiModelProperty(example = "학력")
        private String education;

        @NotBlank
        @ApiModelProperty(example = "장애 구분")
        private String disability;

        @NotBlank
        @ApiModelProperty(example = "중증도")
        private String severity;

        @NotBlank(message = "최소 50자 이상 작성해야 합니다.")
        @ApiModelProperty(example = "자기소개")
        private String introduction;
    }

    @Getter
    @Builder
    public static class ProfilePatch {

        @ApiModelProperty(example = "희망 직무")
        private String desiredJob;

        @ApiModelProperty(example = "학력")
        private String education;

        @ApiModelProperty(example = "장애 구분")
        private String disability;

        @ApiModelProperty(example = "중증도")
        private String severity;

        @ApiModelProperty(example = "자기소개")
        private String introduction;
    }
    
    @Schema(description = "프로필 응답 DTO")
    @Getter
    @Builder
    public static class ProfileResponse {

        @ApiModelProperty(example = "프로필 아이디")
        private Long id;

        @ApiModelProperty(example = "프로필 이미지 url")
        private String imgUrl;

        @ApiModelProperty(example = "희망 직무")
        private String desiredJob;

        @ApiModelProperty(example = "학력")
        private String education;

        @ApiModelProperty(example = "장애 구분")
        private String disability;

        @ApiModelProperty(example = "중증도")
        private String severity;

        @ApiModelProperty(example = "자기소개")
        private String introduction;
    }
}
