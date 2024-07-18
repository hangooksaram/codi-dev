package codi.backend.domain.recommendation.repository;

import codi.backend.domain.recommendation.dto.JobRecommendationDto;

public interface JobRecommendationRepositoryCustom {
    JobRecommendationDto.JobRecommendationResponse findTop3JobCategories(String disability, String severity);
}
