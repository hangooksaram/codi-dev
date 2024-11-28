package codi.backend.domain.mentor.repository;

import static codi.backend.domain.member.entity.QMember.*;
import static codi.backend.domain.profile.entity.QProfile.*;
import static codi.backend.domain.mentor.entity.QMentor.*;

import codi.backend.domain.mentor.dto.MentorDto;
import codi.backend.domain.mentor.dto.QMentorDto_MentorProfileResponse;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.List;

@Repository
public class MentorRepositoryImpl implements MentorRepositoryCustom {
    private final JPAQueryFactory queryFactory;
    public MentorRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public Page<MentorDto.MentorProfileResponse> search(MentorDto.SearchMentorRequest searchMentorRequest, Pageable pageable) {
        String job = searchMentorRequest.getJob();
        String career = searchMentorRequest.getCareer();
        String disability = searchMentorRequest.getDisability();
        String keyword = searchMentorRequest.getKeyword();

        Pageable pageableDown = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize(), pageable.getSort());

        List<MentorDto.MentorProfileResponse> content = queryFactory
                .select(new QMentorDto_MentorProfileResponse(
                        mentor.id,
                        profile.nickname,
                        profile.imgUrl,
                        mentor.career,
                        mentor.job,
                        profile.disability,
                        profile.severity,
                        mentor.star,
                        mentor.mentees
                        ))
                .from(mentor)
                .innerJoin(mentor.member, member)
                .innerJoin(member.profile, profile)
                .where(isEqualDisability(disability),
                        isEqualJob(job),
                        isEqualCareer(career),
                        hasKeyword(keyword))
                .offset(pageableDown.getOffset())
                .limit(pageableDown.getPageSize())
                .fetch();

        long total = queryFactory
                .select(mentor.id)
                .from(mentor)
                .innerJoin(mentor.member, member)
                .innerJoin(member.profile, profile)
                .where(isEqualDisability(disability),
                        isEqualJob(job),
                        isEqualCareer(career),
                        hasKeyword(keyword))
                .fetch()
                .size();

        return new PageImpl<>(content, pageableDown, total);
    }

    private BooleanExpression isEqualDisability(String disability) {
        return StringUtils.hasText(disability) ? profile.disability.eq(disability) : null;
    }

    private BooleanExpression isEqualCareer(String career) {
        return StringUtils.hasText(career) ? mentor.career.eq(career) : null;
    }

    private BooleanExpression isEqualJob(String job) {
        return StringUtils.hasText(job) ? mentor.job.eq(job) : null;
    }

    private BooleanExpression hasKeyword(String keyword) {
        if (StringUtils.hasText(keyword)) {
            BooleanExpression introductionContains = mentor.introduction.contains(keyword);
            BooleanExpression jobContains = mentor.job.contains(keyword);
            return introductionContains.or(jobContains);
        }
        return null;
    }

    @Override
    public List<MentorDto.MentorProfileResponse> getMentorsByRanking(MentorDto.RecommendationMentorRequest request) {
        // NPE 방지를 위해 BooleanBuilder 사용
        BooleanBuilder conditions = buildRankingConditions(request);

        return queryFactory
                .select(new QMentorDto_MentorProfileResponse(
                        mentor.id,
                        profile.nickname,
                        profile.imgUrl,
                        mentor.career,
                        mentor.job,
                        profile.disability,
                        profile.severity,
                        mentor.star,
                        mentor.mentees
                ))
                .from(mentor)
                .innerJoin(mentor.member, member)
                .innerJoin(member.profile, profile)
                .where(conditions)
                .fetch();
    }

    private BooleanBuilder buildRankingConditions(MentorDto.RecommendationMentorRequest request) {
        BooleanBuilder builder = new BooleanBuilder();

        // 직무 추가
        BooleanBuilder jobCondition = new BooleanBuilder();
        jobCondition.or(isEqualJob(request.getFirstJob()));
        jobCondition.or(isEqualJob(request.getSecondJob()));
        jobCondition.or(isEqualJob(request.getThirdJob()));

        // 장애 유형 추가
        BooleanExpression disabilityExpression = isEqualDisability(request.getDisability());

        // 조건 추가
        if (jobCondition.hasValue()) {
            builder.or(jobCondition);
        }

        if (disabilityExpression != null) {
            builder.or(disabilityExpression);
        }

        return builder;
    }

    @Override
    public List<MentorDto.MentorProfileResponse> getTop4Mentors() {
        return queryFactory
                .select(new QMentorDto_MentorProfileResponse(
                        mentor.id,
                        profile.nickname,
                        profile.imgUrl,
                        mentor.career,
                        mentor.job,
                        profile.disability,
                        profile.severity,
                        mentor.star,
                        mentor.mentees
                ))
                .from(mentor)
                .innerJoin(mentor.member, member)
                .innerJoin(member.profile, profile)
                .limit(4)
                .fetch();
    }
}
