package codi.backend.domain.recommendation.repository;

import codi.backend.domain.recommendation.dto.JobRecommendationDto;

import java.util.List;

public interface JobRecommendationRepositoryCustom {
    JobRecommendationDto.Response findTop3JobCategories(String disability, String severity, int age);
}
