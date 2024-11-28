package codi.backend.domain.recommendation.dto;

import com.querydsl.core.annotations.QueryProjection;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

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
    @Setter
    @NoArgsConstructor
    @Builder
    public static class JobRecommendationInfo {
        @Schema(example = "순위(숫자)")
        private Integer ranking;

        @Schema(example = "직무")
        private String job;

        @Schema(example = "차지하는 비율")
        private Double ratio;

        @QueryProjection
        public JobRecommendationInfo(Integer ranking, String job, Double ratio) {
            this.ranking = ranking;
            this.job = job;
            this.ratio = ratio;
        }
    }
}
