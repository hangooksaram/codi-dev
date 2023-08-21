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
    public JobRecommendationDto.Response findTop3JobCategories(String disability, String severity, int age) {
        int ageStart = (age / 10) * 10;
        int ageEnd = ageStart + 10;



        // 전체 카운트 가져오기
        long totalCount = queryFactory
                .from(jobRecommendation)
                .where(jobRecommendation.disability.eq(disability)
                        .and(jobRecommendation.severity.eq(severity))
                        .and(jobRecommendation.age.between(ageStart, ageEnd)))
                .stream()
                .count();

        Expression<Long> countExpression = jobRecommendation.count().as("count");

        List<Tuple> results = queryFactory
                .select(jobRecommendation.job, countExpression)
                .from(jobRecommendation)
                .where(jobRecommendation.disability.eq(disability)
                        .and(jobRecommendation.severity.eq(severity))
                        .and(jobRecommendation.age.between(ageStart, ageEnd)))
                .groupBy(jobRecommendation.job)
                .orderBy(jobRecommendation.count().desc())
                .limit(3)
                .fetch();

        return JobRecommendationDto.Response.builder()
                .disability(disability)
                .infos(mapToJobRecommendationResponse(totalCount, countExpression, results))
                .build();
    }

    private List<JobRecommendationDto.Info> mapToJobRecommendationResponse(long totalCount, Expression<Long> countExpression, List<Tuple> results) {
        List<JobRecommendationDto.Info> responses = new ArrayList<>();

        int rank = 1;
        for (Tuple result : results) {
            String job = result.get(jobRecommendation.job);
            long count = Optional.ofNullable(result.get(countExpression)).orElse(0L);
            double ratio = Math.round(((double) count / totalCount * 100) * 100) / 100.0; // 차지하는 비율
            responses.add(new JobRecommendationDto.Info(rank, job, ratio));
            rank++;
        }

        return responses;
    }
}
