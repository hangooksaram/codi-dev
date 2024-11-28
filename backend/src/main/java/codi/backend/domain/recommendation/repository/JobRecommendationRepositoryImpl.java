package codi.backend.domain.recommendation.repository;

import static codi.backend.domain.recommendation.entity.QJobRecommendation.*;

import codi.backend.domain.recommendation.dto.JobRecommendationDto;
import codi.backend.domain.recommendation.dto.QJobRecommendationDto_JobRecommendationInfo;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberTemplate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class JobRecommendationRepositoryImpl implements JobRecommendationRepositoryCustom {
    private final JPAQueryFactory queryFactory;
    private final JdbcTemplate jdbcTemplate;

    public JobRecommendationRepositoryImpl(JPAQueryFactory queryFactory, JdbcTemplate jdbcTemplate) {
        this.queryFactory = queryFactory;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<JobRecommendationDto.JobRecommendationInfo> findTop3JobCategories(String disability, String severity) {
        // 장애 유형과 중증도에 겹치는 카운트 가져오기
        long filteredJobCount = getFilteredJobCount(disability, severity);

        // 소수점 반올림한 비율 구하기
        NumberTemplate<Double> ratioExpression = getRatioTemplate(filteredJobCount);

        return queryFactory
                .select(new QJobRecommendationDto_JobRecommendationInfo(
                        jobRecommendation.id.multiply(0L).intValue(),
                        jobRecommendation.job,
                        ratioExpression
                ))
                .from(jobRecommendation)
                .where(jobRecommendation.disability.eq(disability)
                        .and(jobRecommendation.severity.eq(severity)))
                .groupBy(jobRecommendation.job)
                .orderBy(jobRecommendation.count().desc())
                .limit(3)
                .fetch();
    }

    // 장애 유형 및 중증도 기반의 Count 쿼리
    private long getFilteredJobCount(String disability, String severity) {
        String sql = "SELECT COUNT(*) " +
                "FROM job_recommendation " +
                "WHERE disability = ? AND severity = ?";

        return Optional.ofNullable(
                jdbcTemplate.queryForObject(sql, Long.class, disability, severity))
                .orElse(0L);
    }

    // 비율 계산 SQL -> QueryDSL
    private NumberTemplate<Double> getRatioTemplate(long filteredJobCount) {
        if (filteredJobCount == 0) { // 0인 경우 0.0 던지기
            return Expressions.numberTemplate(Double.class, "0.0");
        }

        return Expressions.numberTemplate(Double.class,
                "ROUND({0}, 2)",
                jobRecommendation.job.count().doubleValue().divide(filteredJobCount).multiply(100));
    }
}
