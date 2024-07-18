package codi.backend.domain.recommendation.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

public class JobRecommendationDto {
    @Getter
    @Builder
    public static class JobRecommendationResponse {
        @Schema(example = "장애 유형")
        private String disability;

        @Schema(example = "추천 랭킹 순위 정보")
        private List<JobRecommendationInfo> jobRecommendationInfos;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class JobRecommendationInfo {
        @Schema(example = "순위(숫자)")
        private Integer ranking;

        @Schema(example = "직무")
        private String job;

        @Schema(example = "차지하는 비율")
        private Double ratio;
    }
}
