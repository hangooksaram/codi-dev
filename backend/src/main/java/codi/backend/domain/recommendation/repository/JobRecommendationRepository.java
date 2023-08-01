package codi.backend.domain.recommendation.repository;

import codi.backend.domain.recommendation.entity.JobRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRecommendationRepository extends JpaRepository<JobRecommendation, Long>, JobRecommendationRepositoryCustom {
}
