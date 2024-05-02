package codi.backend.domain.recommendation.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.util.List;

public class JobRecommendationDto {
    @Getter
    @Builder
    public static class Response {
        @ApiModelProperty(example = "장애 유형")
        private String disability;

        @ApiModelProperty(example = "추천 랭킹 순위 정보")
        private List<Info> infos;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class Info {
        @ApiModelProperty(example = "순위(숫자)")
        private Integer ranking;

        @ApiModelProperty(example = "직무")
        private String job;

        @ApiModelProperty(example = "차지하는 비율")
        private Double ratio;
    }
}
