package codi.backend.domain.recommendation.repository;

import codi.backend.domain.recommendation.dto.JobRecommendationDto;
import codi.backend.domain.recommendation.entity.QJobRecommendation;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Expression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class JobRecommendationRepositoryImpl implements JobRecommendationRepositoryCustom {
    private final JPAQueryFactory queryFactory;
    private final QJobRecommendation jobRecommendation = QJobRecommendation.jobRecommendation;

    public JobRecommendationRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public JobRecommendationDto.JobRecommendationResponse findTop3JobCategories(String disability, String severity) {
        // 전체 카운트 가져오기
        long totalCount = queryFactory
                .from(jobRecommendation)
                .where(jobRecommendation.disability.eq(disability)
                        .and(jobRecommendation.severity.eq(severity)))
                .stream()
                .count();

        Expression<Long> countExpression = jobRecommendation.count().as("count");

        List<Tuple> results = queryFactory
                .select(jobRecommendation.job, countExpression)
                .from(jobRecommendation)
                .where(jobRecommendation.disability.eq(disability)
                        .and(jobRecommendation.severity.eq(severity)))
                .groupBy(jobRecommendation.job)
                .orderBy(jobRecommendation.count().desc())
                .limit(3)
                .fetch();

        return JobRecommendationDto.JobRecommendationResponse.builder()
                .disability(disability)
                .jobRecommendationInfos(mapToJobRecommendationResponse(totalCount, countExpression, results))
                .build();
    }

    private List<JobRecommendationDto.JobRecommendationInfo> mapToJobRecommendationResponse(long totalCount, Expression<Long> countExpression, List<Tuple> results) {
        List<JobRecommendationDto.JobRecommendationInfo> responses = new ArrayList<>();

        int rank = 1;
        for (Tuple result : results) {
            String job = result.get(jobRecommendation.job);
            long count = Optional.ofNullable(result.get(countExpression)).orElse(0L);
            double ratio = Math.round(((double) count / totalCount * 100) * 100) / 100.0; // 차지하는 비율
            responses.add(new JobRecommendationDto.JobRecommendationInfo(rank, job, ratio));
            rank++;
        }

        return responses;
    }
}
