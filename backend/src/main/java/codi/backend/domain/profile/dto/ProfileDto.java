package codi.backend.domain.profile.dto;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

public class ProfileDto {

    @Getter
    @Builder
    public static class ProfilePost {
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

        @ApiModelProperty(example = "장애 기간")
        private String period;

        @ApiModelProperty(example = "자기소개")
        private String introduction;
    }

    @Getter
    @Builder
    public static class ProfilePatch {
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

        @ApiModelProperty(example = "장애 기간")
        private String period;

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

        @ApiModelProperty(example = "장애 기간")
        private String period;

        @ApiModelProperty(example = "자기소개")
        private String introduction;
    }
}
