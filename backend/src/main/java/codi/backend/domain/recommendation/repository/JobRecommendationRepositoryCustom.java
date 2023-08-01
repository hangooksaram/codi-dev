package codi.backend.domain.recommendation.repository;

import java.util.List;

public interface JobRecommendationRepositoryCustom {
    List<String> findTop3JobCategories(String disability, String severity, int age);
}
