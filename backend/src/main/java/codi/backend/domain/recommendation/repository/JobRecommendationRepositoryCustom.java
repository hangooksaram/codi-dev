package codi.backend.domain.recommendation.repository;

import codi.backend.domain.recommendation.dto.JobRecommendationDto;

import java.util.List;

public interface JobRecommendationRepositoryCustom {
    List<JobRecommendationDto.JobRecommendationInfo> findTop3JobCategories(String disability, String severity);
}
