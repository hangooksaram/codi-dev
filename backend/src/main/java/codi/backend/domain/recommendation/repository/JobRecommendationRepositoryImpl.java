package codi.backend.domain.recommendation.repository;

import codi.backend.domain.recommendation.entity.QJobRecommendation;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class JobRecommendationRepositoryImpl implements JobRecommendationRepositoryCustom {
    private final JPAQueryFactory queryFactory;
    private final QJobRecommendation jobRecommendation = QJobRecommendation.jobRecommendation;

    public JobRecommendationRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    // TODO 멘토링, 스케줄 기능 개발 완료 후 순위, 퍼센트 표시 추가
    @Override
    public List<String> findTop3JobCategories(String disability, String severity, int age) {
        int ageStart = (age / 10) * 10;
        int ageEnd = ageStart + 10;

        return queryFactory
                .select(jobRecommendation.job)
                .from(jobRecommendation)
                .where(jobRecommendation.disability.eq(disability)
                        .and(jobRecommendation.severity.eq(severity))
                        .and(jobRecommendation.age.between(ageStart, ageEnd)))
                .groupBy(jobRecommendation.job)
                .orderBy(jobRecommendation.count().desc())
                .limit(3)
                .fetch();
    }
}
