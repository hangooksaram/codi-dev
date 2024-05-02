package codi.backend.domain.recommendation.service;

import codi.backend.domain.recommendation.dto.JobRecommendationDto;

import java.util.List;

public interface JobRecommendationService {
    JobRecommendationDto.Response recommendJobs(String memberId);
}
