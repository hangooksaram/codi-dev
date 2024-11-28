package codi.backend.domain.recommendation.service;

import codi.backend.domain.recommendation.dto.JobRecommendationDto;

public interface JobRecommendationService {
    JobRecommendationDto.JobRecommendationResponse recommendJobs(Long profileId);
}
