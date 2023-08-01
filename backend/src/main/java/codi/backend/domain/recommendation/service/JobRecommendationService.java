package codi.backend.domain.recommendation.service;

import java.util.List;

public interface JobRecommendationService {
    List<String> recommendJobs(String memberId);
}
