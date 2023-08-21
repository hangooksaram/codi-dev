package codi.backend.domain.recommendation.dto;

import lombok.*;

import java.util.List;

public class JobRecommendationDto {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        private String disability;
        private List<Info> infos;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Info {
        private Integer ranking;
        private String job;
        private Double ratio;
    }
}
