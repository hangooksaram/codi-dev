package codi.backend.domain.mentoring.repository;

import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.mentoring.dto.MentoringDto;
import codi.backend.domain.mentoring.entity.Mentoring;
import codi.backend.domain.mentoring.entity.QMentoring;
import codi.backend.domain.profile.entity.Profile;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public class MentoringRepositoryImpl implements MentoringRepositoryCustom {
    private final JPAQueryFactory queryFactory;
    private final QMentoring mentoring = QMentoring.mentoring;

    public MentoringRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    // Mentor가 Mentee 정보 본다.
    @Override
    public MentoringDto.MentoringDailyMenteesResponse findDailyMentoringsOfMentor(Mentor mentor, LocalDate date) {
        List<Mentoring> mentorings = queryFactory.selectFrom(mentoring)
                .where(mentoring.mentor.eq(mentor)
                        .and(mentoring.schedule.startDateTime.goe(date.atStartOfDay())
                                .and(mentoring.schedule.endDateTime.lt(date.plusDays(1).atStartOfDay()))))
                .fetch();

        List<MentoringDto.MenteeInfoResponse> menteeInfoResponses = mapToMenteeInfoResponses(mentorings);

        return MentoringDto.MentoringDailyMenteesResponse.builder()
                .date(date.format(DateTimeFormatter.ofPattern("yyyy/MM/dd")))
                .mentees(menteeInfoResponses)
                .build();
    }

    @Override
    public MentoringDto.MentoringMonthlyMenteesResponse findMonthlyMentoringsOfMentor(Mentor mentor, LocalDate month) {
        LocalDate startOfMonth = month.withDayOfMonth(1);
        LocalDate endOfMonth = month.withDayOfMonth(month.lengthOfMonth());

        List<Mentoring> monthlyMentorings = queryFactory.selectFrom(mentoring)
                .where(mentoring.mentor.eq(mentor)
                        .and(mentoring.schedule.startDateTime.goe(startOfMonth.atStartOfDay())
                                .and(mentoring.schedule.endDateTime.lt(endOfMonth.plusDays(1).atStartOfDay()))))
                .fetch();

        Map<LocalDate, List<Mentoring>> groupedByDate = monthlyMentorings.stream()
                .collect(Collectors.groupingBy(m -> m.getSchedule().getStartDateTime().toLocalDate()));

        List<MentoringDto.MentoringDailyMenteesResponse> dailyResponses = groupedByDate.entrySet().stream()
                .map(entry -> {
                    LocalDate date = entry.getKey();
                    List<Mentoring> dailyMentorings = entry.getValue();

                    List<MentoringDto.MenteeInfoResponse> menteeInfoResponses = mapToMenteeInfoResponses(dailyMentorings);

                    return MentoringDto.MentoringDailyMenteesResponse.builder()
                            .date(date.format(DateTimeFormatter.ofPattern("yyyy/MM/dd")))
                            .mentees(menteeInfoResponses)
                            .build();
                })
                .collect(Collectors.toList());

        return MentoringDto.MentoringMonthlyMenteesResponse.builder()
                .month(month.format(DateTimeFormatter.ofPattern("yyyy/MM")))
                .dailyMentees(dailyResponses)
                .build();
    }

    private List<MentoringDto.MenteeInfoResponse> mapToMenteeInfoResponses(List<Mentoring> mentorings) {
        return mentorings.stream()
                .map(m -> new MentoringDto.MenteeInfoResponse(
                        m.getId(),
                        m.getSchedule().getStartDateTime().toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm")) + " - " + m.getSchedule().getEndDateTime().toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm")),
                        m.getProfile().getMember().getName(),
                        m.getProfile().getImgUrl(),
                        m.getMentor().getJobName(),
                        m.getLink(),
                        m.getMentoringPlatform() == null ? "No Selection." : m.getMentoringPlatform().getPlatform()
                ))
                .collect(Collectors.toList());
    }

    // Mentee가 Mentor 정보 본다.
    @Override
    public MentoringDto.MentoringDailyMentorsResponse findDailyMentoringsOfMentee(Profile profile, LocalDate date) {
        List<Mentoring> mentorings = queryFactory.selectFrom(mentoring)
                .where(mentoring.profile.eq(profile)
                        .and(mentoring.schedule.startDateTime.goe(date.atStartOfDay())
                                .and(mentoring.schedule.endDateTime.lt(date.plusDays(1).atStartOfDay()))))
                .fetch();

        List<MentoringDto.MentorInfoResponse> mentorInfoResponses = mapToMentorInfoResponses(mentorings);

        return MentoringDto.MentoringDailyMentorsResponse.builder()
                .date(date.format(DateTimeFormatter.ofPattern("yyyy/MM/dd")))
                .mentors(mentorInfoResponses)
                .build();
    }

    @Override
    public MentoringDto.MentoringMonthlyMentorsResponse findMonthlyMentoringsOfMentee(Profile profile, LocalDate month) {
        LocalDate startOfMonth = month.withDayOfMonth(1);
        LocalDate endOfMonth = month.withDayOfMonth(month.lengthOfMonth());

        List<Mentoring> monthlyMentorings = queryFactory.selectFrom(mentoring)
                .where(mentoring.profile.eq(profile)
                        .and(mentoring.schedule.startDateTime.goe(startOfMonth.atStartOfDay())
                                .and(mentoring.schedule.endDateTime.lt(endOfMonth.plusDays(1).atStartOfDay()))))
                .fetch();

        Map<LocalDate, List<Mentoring>> groupedByDate = monthlyMentorings.stream()
                .collect(Collectors.groupingBy(m -> m.getSchedule().getStartDateTime().toLocalDate()));

        List<MentoringDto.MentoringDailyMentorsResponse> dailyResponses = groupedByDate.entrySet().stream()
                .map(entry -> {
                    LocalDate date = entry.getKey();
                    List<Mentoring> dailyMentorings = entry.getValue();

                    List<MentoringDto.MentorInfoResponse> mentorInfoResponses = mapToMentorInfoResponses(dailyMentorings);

                    return MentoringDto.MentoringDailyMentorsResponse.builder()
                            .date(date.format(DateTimeFormatter.ofPattern("yyyy/MM/dd")))
                            .mentors(mentorInfoResponses)
                            .build();
                })
                .collect(Collectors.toList());

        return MentoringDto.MentoringMonthlyMentorsResponse.builder()
                .month(month.format(DateTimeFormatter.ofPattern("yyyy/MM")))
                .dailyMentors(dailyResponses)
                .build();
    }

    private List<MentoringDto.MentorInfoResponse> mapToMentorInfoResponses(List<Mentoring> mentorings) {
        return mentorings.stream()
                .map(m -> new MentoringDto.MentorInfoResponse(
                        m.getId(),
                        m.getSchedule().getStartDateTime().toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm")) + " - " + m.getSchedule().getEndDateTime().toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm")),
                        m.getMentor().getMember().getName(),
                        m.getProfile().getImgUrl(),
                        m.getMentor().getJobName(),
                        m.getLink(),
                        m.getMentoringPlatform() == null ? "No Selection." : m.getMentoringPlatform().getPlatform()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public Page<MentoringDto.MentoringApplicationResponse> findAllMentoringApplications(Mentor mentor, String order, Pageable pageable) {
        BooleanExpression whereClause = mentoring.mentor.eq(mentor)
                .and(mentoring.mentoringStatus.eq(Mentoring.MentoringStatus.APPLICATION));

        OrderSpecifier<Long> orderBy = "desc".equalsIgnoreCase(order) ?
                mentoring.id.desc() : mentoring.id.asc();

        int adjustedPageNumber = pageable.getPageNumber() - 1;
        int offset = adjustedPageNumber * pageable.getPageSize();

        List<MentoringDto.MentoringApplicationResponse> content = queryFactory
                .selectFrom(mentoring)
                .join(mentoring.schedule)
                .where(whereClause)
                .orderBy(orderBy)
                .offset(offset)
                .limit(pageable.getPageSize())
                .fetch()
                .stream()
                .map(this::mapToMentoringApplicationResponse)
                .collect(Collectors.toList());

        long total = queryFactory
                .selectFrom(mentoring)
                .where(whereClause)
                .stream()
                .count();

        return new PageImpl<>(content, PageRequest.of(adjustedPageNumber, pageable.getPageSize(), pageable.getSort()), total);
    }

    private MentoringDto.MentoringApplicationResponse mapToMentoringApplicationResponse(Mentoring m) {
        String schedule = m.getSchedule().getStartDateTime().format(DateTimeFormatter.ofPattern("yyyy/MM/dd (E) HH:mm")) +
                " - " + m.getSchedule().getEndDateTime().format(DateTimeFormatter.ofPattern("HH:mm"));
        Profile profile = m.getProfile();

        MentoringDto.MentoringApplicationMenteeInfoResponse menteeInfo = MentoringDto.MentoringApplicationMenteeInfoResponse
                .builder()
                .profileId(profile.getId())
                .name(profile.getMember().getName())
                .employmentStatus(profile.getEmploymentStatus().getEmploymentStatus())
                .desiredJob(profile.getDesiredJob())
                .disability(profile.getDisability())
                .severity(profile.getSeverity())
                .build();

        return new MentoringDto.MentoringApplicationResponse(
                m.getId(),
                menteeInfo,
                schedule,
                m.getApplicationReason()
                );
    }
}
