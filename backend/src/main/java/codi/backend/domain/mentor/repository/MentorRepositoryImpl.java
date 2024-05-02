package codi.backend.domain.mentor.repository;

import codi.backend.domain.member.entity.QMember;
import codi.backend.domain.mentor.dto.MentorDto;
import codi.backend.domain.mentor.entity.QMentor;
import codi.backend.domain.profile.entity.QProfile;
import codi.backend.domain.schedule.entity.QSchedule;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public class MentorRepositoryImpl implements MentorRepositoryCustom {
    private final JPAQueryFactory queryFactory;
    private final QMentor mentor = QMentor.mentor;
    public MentorRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public Page<MentorDto.SearchMentorResponse> search(String job, String career, String disability, String keyword, Pageable pageable) {
        QMember member = QMember.member;
        QProfile profile = QProfile.profile;
        QSchedule schedule = QSchedule.schedule;

        BooleanBuilder builder = new BooleanBuilder();
        if (StringUtils.hasText(disability)) {
            builder.and(profile.disability.eq(disability));
        }
        if (StringUtils.hasText(job)) {
            builder.and(mentor.job.eq(job));
        }
        if (StringUtils.hasText(career)) {
            builder.and(mentor.career.eq(career));
        }
        if (StringUtils.hasText(keyword)) {
            builder.and(mentor.company.contains(keyword)
                    .or(mentor.introduction.contains(keyword))
                    .or(mentor.jobName.contains(keyword))
                    .or(member.name.contains(keyword)));
        }

        Pageable pageableDown = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize(), pageable.getSort());

        List<MentorDto.SearchMentorResponse> content = queryFactory
                .select(Projections.bean(
                        MentorDto.SearchMentorResponse.class,
                        member.id.as("id"),
                        member.name.as("name"),
                        profile.imgUrl.as("imgUrl"),
                        profile.disability.as("disability"),
                        profile.severity.as("severity"),
                        mentor.id.as("mentorId"),
                        mentor.job.as("job"),
                        mentor.jobName.as("jobName"),
                        mentor.career.as("career"),
                        mentor.isCertificate.as("isCertificate"),
                        mentor.star.as("star"),
                        mentor.mentees.as("mentees")))
                .from(mentor)
                .innerJoin(mentor.member, member)
                .innerJoin(member.profile, profile)
                .where(builder)
                .offset(pageableDown.getOffset())
                .limit(pageableDown.getPageSize())
                .fetch();

        long total = queryFactory
                .select(mentor.id)
                .from(mentor)
                .innerJoin(mentor.member, member)
                .innerJoin(member.profile, profile)
                .where(builder)
                .fetch()
                .size();

        return new PageImpl<>(content, pageableDown, total);
    }

    @Override
    public List<MentorDto.IntermediateMentorResponse> getMentorsByRanking(MentorDto.RecommendationMentorRequest request) {
        QMentor mentor = QMentor.mentor;

        BooleanBuilder jobExpression = new BooleanBuilder();
        if (request.getFirstJob() != null) {
            jobExpression.or(mentor.job.eq(request.getFirstJob()));
        }

        if (request.getSecondJob() != null) {
            jobExpression.or(mentor.job.eq(request.getSecondJob()));
        }

        if (request.getThirdJob() != null) {
            jobExpression.or(mentor.job.eq(request.getThirdJob()));
        }

        return queryFactory.select(Projections.constructor(MentorDto.IntermediateMentorResponse.class,
                        mentor.member.id,
                        mentor.id,
                        mentor.member.profile.imgUrl,
                        mentor.isCertificate,
                        mentor.member.name,
                        mentor.job,
                        mentor.jobName,
                        mentor.inOffice,
                        mentor.career,
                        mentor.member.profile.disability,
                        mentor.member.profile.severity,
                        mentor.star,
                        mentor.mentees))
                .from(mentor)
                .innerJoin(mentor.member, QMember.member)
                .innerJoin(mentor.member.profile, QProfile.profile)
                .where(jobExpression)
                .fetch();
    }
}
