package codi.backend.domain.mentor.repository;

import codi.backend.domain.mentor.dto.MentorDto;
import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.member.entity.QMember;
import codi.backend.domain.mentor.entity.QMentor;
import codi.backend.domain.profile.entity.QProfile;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPQLQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.util.StringUtils;

import java.util.Objects;

public class MentorRepositoryImpl extends QuerydslRepositorySupport implements MentorRepositoryCustom {

    public MentorRepositoryImpl() {
        super(Mentor.class);
    }

    @Override
    public Page<MentorDto.SearchMentorResponse> search(String job, String career, String disability, String keyword, Pageable pageable) {
        QMember member = QMember.member;
        QProfile profile = QProfile.profile;
        QMentor mentor = QMentor.mentor;

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
                    .or(mentor.introduction.contains(keyword)));
        }

        Pageable pageableDown = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize(), pageable.getSort());

        JPQLQuery<MentorDto.SearchMentorResponse> query = from(mentor)
                .innerJoin(mentor.member, member)
                .innerJoin(member.profile, profile)
                .where(builder)
                .select(Projections.bean(
                        MentorDto.SearchMentorResponse.class,
                        member.id.as("id"),
                        member.name.as("name"),
                        profile.imgUrl.as("imgUrl"),
                        profile.disability.as("disability"),
                        profile.severity.as("severity"),
                        mentor.id.as("mentorId"),
                        mentor.job.as("job"),
                        mentor.isCertificate.as("isCertificate"),
                        mentor.star.as("star"),
                        mentor.mentees.as("mentees")));

        JPQLQuery<MentorDto.SearchMentorResponse> pageableQuery = Objects.requireNonNull(getQuerydsl()).applyPagination(pageableDown, query);
        QueryResults<MentorDto.SearchMentorResponse> result = pageableQuery.fetchResults();

        return new PageImpl<>(result.getResults(), pageableDown, result.getTotal());
    }
}
