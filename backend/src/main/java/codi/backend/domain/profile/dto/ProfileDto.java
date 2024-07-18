package codi.backend.domain.profile.dto;

import codi.backend.domain.favorite.dto.FavoriteDto;
import codi.backend.domain.profile.entity.Profile;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Set;

public class ProfileDto {
    @Getter
    @Builder
    public static class ProfilePost {
        @NotBlank
        @Schema(example = "별명")
        private String nickname;

        @NotBlank
        @Schema(example = "희망 직무")
        private String desiredJob;

        @NotBlank
        @Schema(example = "장애 구분")
        private String disability;

        @NotBlank
        @Schema(example = "중증도")
        private String severity;

        @NotNull
        @Schema(example = "멘티의 현재 상태를 입력하세요. 취업 준비생, 학생, 이직 준비중, 멘티 중 하나를 선택할 수 있습니다.")
        private Profile.EmploymentStatus employmentStatus;
    }

    @Getter
    @Builder
    public static class ProfilePatch {
        @Schema(example = "별명")
        private String nickname;

        @Schema(example = "희망 직무")
        private String desiredJob;

        @Schema(example = "장애 구분")
        private String disability;

        @Schema(example = "중증도")
        private String severity;

        @Schema(example = "멘티의 현재 상태를 입력하세요. 취업 준비생, 학생, 이직 준비중, 멘티 중 하나를 선택할 수 있습니다.")
        private Profile.EmploymentStatus employmentStatus;
    }
    
    @Schema(description = "프로필 응답 DTO")
    @Getter
    @Builder
    public static class ProfileResponse {
        @Schema(example = "프로필 아이디")
        private Long id;

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

        @Schema(example = "관심 멘토")
        private Set<FavoriteDto.FavoriteResponse> favorites;
    }
}
