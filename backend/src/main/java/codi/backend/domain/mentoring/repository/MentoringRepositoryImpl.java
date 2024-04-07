package codi.backend.domain.mentoring.repository;

import codi.backend.domain.member.entity.Member;
import codi.backend.domain.mentor.dto.MentorDto;
import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.mentor.entity.QMentor;
import codi.backend.domain.mentoring.dto.MentoringDto;
import codi.backend.domain.mentoring.dto.QMentoringDto_MentoringInfo;
import codi.backend.domain.mentoring.entity.Mentoring;
import codi.backend.domain.mentoring.entity.QMentoring;
import codi.backend.domain.profile.entity.Profile;
import codi.backend.domain.profile.entity.QProfile;
import codi.backend.domain.schedule.entity.QSchedule;
import com.querydsl.core.types.OrderSpecifier;
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
import java.util.List;
import java.util.Map;
import java.util.Objects;
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
        BooleanExpression dateCondition = mentoring.schedule.startDateTime.goe(date.atStartOfDay())
                .and(mentoring.schedule.endDateTime.lt(date.plusDays(1).atStartOfDay()));

        BooleanExpression statusCondition = mentoring.mentoringStatus.eq(Mentoring.MentoringStatus.ACCEPTED)
                .or(mentoring.mentoringStatus.eq(Mentoring.MentoringStatus.COMPLETED));

        List<Mentoring> mentorings = queryFactory.selectFrom(mentoring)
                .where(mentoring.mentor.eq(mentor)
                        .and(dateCondition)
                        .and(statusCondition))
                .fetch();

        String mentoringStatus = mentorings.stream()
                .map(Mentoring::getMentoringStatus)
                .map(status -> {
                    if (status == Mentoring.MentoringStatus.COMPLETED) return Mentoring.MentoringStatus.COMPLETED.toString();
                    if (status == Mentoring.MentoringStatus.ACCEPTED) return Mentoring.MentoringStatus.ACCEPTED.toString();
                    return null;
                })
                .filter(Objects::nonNull)
                .findFirst()
                .orElse(null);

        List<MentoringDto.MenteeInfoResponse> menteeInfoResponses = mapToMenteeInfoResponses(mentorings);

        return MentoringDto.MentoringDailyMenteesResponse.builder()
                .date(date.format(DateTimeFormatter.ofPattern("yyyy/MM/dd")))
                .mentoringMembers(menteeInfoResponses)
                .mentoringStatus(mentoringStatus)
                .build();
    }

    @Override
    public MentoringDto.MentoringMonthlyMenteesResponse findMonthlyMentoringsOfMentor(Mentor mentor, LocalDate month) {
        LocalDate startOfMonth = month.withDayOfMonth(1);
        LocalDate endOfMonth = month.withDayOfMonth(month.lengthOfMonth());

        BooleanExpression monthCondition = mentoring.schedule.startDateTime.goe(startOfMonth.atStartOfDay())
                .and(mentoring.schedule.endDateTime.lt(endOfMonth.plusDays(1).atStartOfDay()));

        BooleanExpression statusCondition = mentoring.mentoringStatus.eq(Mentoring.MentoringStatus.ACCEPTED)
                .or(mentoring.mentoringStatus.eq(Mentoring.MentoringStatus.COMPLETED));

        List<Mentoring> monthlyMentorings = queryFactory.selectFrom(mentoring)
                .where(mentoring.mentor.eq(mentor)
                        .and(monthCondition)
                        .and(statusCondition))
                .orderBy(mentoring.schedule.startDateTime.asc())
                .fetch();

        Map<LocalDate, List<Mentoring>> groupedByDate = monthlyMentorings.stream()
                .collect(Collectors.groupingBy(m -> m.getSchedule().getStartDateTime().toLocalDate()));

        List<MentoringDto.MentoringDailyMenteesResponse> dailyResponses = groupedByDate.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .map(entry -> {
                    LocalDate date = entry.getKey();
                    List<Mentoring> dailyMentorings = entry.getValue();

                    List<MentoringDto.MenteeInfoResponse> menteeInfoResponses = mapToMenteeInfoResponses(dailyMentorings);

                    String mentoringStatus = dailyMentorings.stream()
                            .map(Mentoring::getMentoringStatus)
                            .map(status -> {
                                if (status == Mentoring.MentoringStatus.COMPLETED) return Mentoring.MentoringStatus.COMPLETED.toString();
                                if (status == Mentoring.MentoringStatus.ACCEPTED) return Mentoring.MentoringStatus.ACCEPTED.toString();
                                return null;
                            })
                            .filter(Objects::nonNull)
                            .findFirst()
                            .orElse(null);

                    return MentoringDto.MentoringDailyMenteesResponse.builder()
                            .date(date.format(DateTimeFormatter.ofPattern("yyyy/MM/dd")))
                            .mentoringMembers(menteeInfoResponses)
                            .mentoringStatus(mentoringStatus)
                            .build();
                })
                .collect(Collectors.toList());

        return MentoringDto.MentoringMonthlyMenteesResponse.builder()
                .month(month.format(DateTimeFormatter.ofPattern("yyyy/MM")))
                .monthlyMentoringMembers(dailyResponses)
                .build();
    }

    private List<MentoringDto.MenteeInfoResponse> mapToMenteeInfoResponses(List<Mentoring> mentorings) {
        return mentorings.stream()
                .map(m -> new MentoringDto.MenteeInfoResponse(
                        m.getId(),
                        m.getProfile().getId(),
                        m.getSchedule().getStartDateTime().toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm")) + " - " + m.getSchedule().getEndDateTime().toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm")),
                        m.getProfile().getMember().getName(),
                        m.getProfile().getImgUrl(),
                        m.getProfile().getDesiredJob(),
                        m.getLink(),
                        m.getMentoringPlatform() == null ? "No Selection." : m.getMentoringPlatform().getPlatform()
                ))
                .collect(Collectors.toList());
    }

    // Mentee가 Mentor 정보 본다.
    @Override
    public MentoringDto.MentoringDailyMentorsResponse findDailyMentoringsOfMentee(Profile profile, LocalDate date) {
        BooleanExpression dateCondition = mentoring.schedule.startDateTime.goe(date.atStartOfDay())
                .and(mentoring.schedule.endDateTime.lt(date.plusDays(1).atStartOfDay()));

        BooleanExpression statusCondition = mentoring.mentoringStatus.eq(Mentoring.MentoringStatus.ACCEPTED)
                .or(mentoring.mentoringStatus.eq(Mentoring.MentoringStatus.COMPLETED));

        List<Mentoring> mentorings = queryFactory.selectFrom(mentoring)
                .where(mentoring.profile.eq(profile)
                        .and(dateCondition)
                        .and(statusCondition))
                .fetch();

        List<MentoringDto.MentorInfoResponse> mentorInfoResponses = mapToMentorInfoResponses(mentorings);

        String mentoringStatus = mentorings.stream()
                .map(Mentoring::getMentoringStatus)
                .map(status -> {
                    if (status == Mentoring.MentoringStatus.COMPLETED) return Mentoring.MentoringStatus.COMPLETED.toString();
                    if (status == Mentoring.MentoringStatus.ACCEPTED) return Mentoring.MentoringStatus.ACCEPTED.toString();
                    return null;
                })
                .filter(Objects::nonNull)
                .findFirst()
                .orElse(null);

        return MentoringDto.MentoringDailyMentorsResponse.builder()
                .date(date.format(DateTimeFormatter.ofPattern("yyyy/MM/dd")))
                .mentoringMembers(mentorInfoResponses)
                .mentoringStatus(mentoringStatus)
                .build();
    }

    @Override
    public MentoringDto.MentoringMonthlyMentorsResponse findMonthlyMentoringsOfMentee(Profile profile, LocalDate month) {
        LocalDate startOfMonth = month.withDayOfMonth(1);
        LocalDate endOfMonth = month.withDayOfMonth(month.lengthOfMonth());

        BooleanExpression monthCondition = mentoring.schedule.startDateTime.goe(startOfMonth.atStartOfDay())
                .and(mentoring.schedule.endDateTime.lt(endOfMonth.plusDays(1).atStartOfDay()));

        BooleanExpression statusCondition = mentoring.mentoringStatus.eq(Mentoring.MentoringStatus.ACCEPTED)
                .or(mentoring.mentoringStatus.eq(Mentoring.MentoringStatus.COMPLETED));

        List<Mentoring> monthlyMentorings = queryFactory.selectFrom(mentoring)
                .where(mentoring.profile.eq(profile)
                        .and(monthCondition)
                        .and(statusCondition))
                .orderBy(mentoring.schedule.startDateTime.asc())
                .fetch();

        Map<LocalDate, List<Mentoring>> groupedByDate = monthlyMentorings.stream()
                .collect(Collectors.groupingBy(m -> m.getSchedule().getStartDateTime().toLocalDate()));

        List<MentoringDto.MentoringDailyMentorsResponse> dailyResponses = groupedByDate.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .map(entry -> {
                    LocalDate date = entry.getKey();
                    List<Mentoring> dailyMentorings = entry.getValue();

                    List<MentoringDto.MentorInfoResponse> mentorInfoResponses = mapToMentorInfoResponses(dailyMentorings);

                    String mentoringStatus = dailyMentorings.stream()
                            .map(Mentoring::getMentoringStatus)
                            .map(status -> {
                                if (status == Mentoring.MentoringStatus.COMPLETED) return Mentoring.MentoringStatus.COMPLETED.toString();
                                if (status == Mentoring.MentoringStatus.ACCEPTED) return Mentoring.MentoringStatus.ACCEPTED.toString();
                                return null;
                            })
                            .filter(Objects::nonNull)
                            .findFirst()
                            .orElse(null);

                    return MentoringDto.MentoringDailyMentorsResponse.builder()
                            .date(date.format(DateTimeFormatter.ofPattern("yyyy/MM/dd")))
                            .mentoringMembers(mentorInfoResponses)
                            .mentoringStatus(mentoringStatus)
                            .build();
                })
                .collect(Collectors.toList());

        return MentoringDto.MentoringMonthlyMentorsResponse.builder()
                .month(month.format(DateTimeFormatter.ofPattern("yyyy/MM")))
                .monthlyMentoringMembers(dailyResponses)
                .build();
    }

    private List<MentoringDto.MentorInfoResponse> mapToMentorInfoResponses(List<Mentoring> mentorings) {
        return mentorings.stream()
                .map(m -> new MentoringDto.MentorInfoResponse(
                        m.getId(),
                        m.getMentor().getId(),
                        m.getSchedule().getStartDateTime().toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm")) + " - " + m.getSchedule().getEndDateTime().toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm")),
                        m.getMentor().getMember().getName(),
                        m.getMentor().getMember().getProfile().getImgUrl(),
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
                .fetch()
                .size();

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
                .imgUrl(profile.getImgUrl())
                .employmentStatus(profile.getEmploymentStatus().getEmploymentStatus())
                .desiredJob(profile.getDesiredJob())
                .disability(profile.getDisability())
                .severity(profile.getSeverity())
                .build();

        return new MentoringDto.MentoringApplicationResponse(
                m.getId(),
                menteeInfo,
                schedule,
                m.getApplicationReason(),
                m.getMentoringStatus().name(),
                m.getSchedule().getStartDateTime().isBefore(LocalDateTime.now())
                );
    }

    @Override
    public List<MentoringDto.TodayMentoringInfoResponse> findTodayMentoringSchedules(Profile profile) {
        BooleanExpression todayCondition = mentoring.schedule.startDateTime.after(LocalDateTime.now());
        BooleanExpression statusCondition = mentoring.mentoringStatus.eq(Mentoring.MentoringStatus.ACCEPTED);

        return queryFactory.selectFrom(mentoring)
                .where(mentoring.profile.eq(profile)
                        .and(todayCondition)
                        .and(statusCondition))
                .orderBy(mentoring.schedule.startDateTime.asc())
                .limit(4)
                .fetch()
                .stream()
                .map(this::mapToTodayMentoringInfoResponse)
                .collect(Collectors.toList());
    }

    private MentoringDto.TodayMentoringInfoResponse mapToTodayMentoringInfoResponse(Mentoring m) {
        String applicationDate = m.getSchedule().getStartDateTime().format(DateTimeFormatter.ofPattern("yyyy/MM/dd (E) HH:mm")) +
                " - " + m.getSchedule().getEndDateTime().format(DateTimeFormatter.ofPattern("HH:mm"));
        Member mentorMember = m.getMentor().getMember();
        Mentor mentor = m.getMentor();
        Profile mentorProfile = m.getMentor().getMember().getProfile();

        MentorDto.SearchMentorResponse searchMentorResponse = MentorDto.SearchMentorResponse.builder()
                .id(mentorMember.getId())
                .mentorId(mentor.getId())
                .imgUrl(mentorProfile.getImgUrl())
                .isCertificate(mentor.getIsCertificate())
                .name(mentorMember.getName())
                .job(mentor.getJob())
                .jobName(mentor.getJobName())
                .career(mentor.getCareer())
                .disability(mentorProfile.getDisability())
                .severity(mentorProfile.getSeverity())
                .star(mentor.getStar())
                .mentees(mentor.getMentees())
                .build();

        return MentoringDto.TodayMentoringInfoResponse.builder()
                .applicationDate(applicationDate)
                .mentorInfo(searchMentorResponse)
                .build();
    }

    // 멘토링 횟수
    @Override
    public List<MentoringDto.MentoringInfo> findAcceptedMentoringsBeforeCurrentTime(Long mentorId, LocalDateTime currentTime) {
        QMentor mentor = QMentor.mentor;
        QProfile profile = QProfile.profile;
        QSchedule schedule = QSchedule.schedule;

        return queryFactory
                .select(new QMentoringDto_MentoringInfo(
                        mentoring.id,
                        mentoring.mentoringStatus,
                        mentoring.mentor.id,
                        mentoring.profile.id,
                        mentoring.schedule.id
                ))
                .from(mentoring)
                .leftJoin(mentoring.mentor, mentor)
                .leftJoin(mentoring.profile, profile)
                .leftJoin(mentoring.schedule, schedule)
                .where(mentorMatches(mentorId)
                        .and(isAccepted())
                        .and(endTimeBeforeNow(currentTime)))
                .fetch();
    }

    // 응답률
    @Override
    public List<MentoringDto.MentoringInfo> findByMentorId(Long mentorId) {
        QMentor mentor = QMentor.mentor;
        QProfile profile = QProfile.profile;
        QSchedule schedule = QSchedule.schedule;

        return queryFactory
                .select(new QMentoringDto_MentoringInfo(
                        mentoring.id,
                        mentoring.mentoringStatus,
                        mentoring.mentor.id,
                        mentoring.profile.id,
                        mentoring.schedule.id
                ))
                .from(mentoring)
                .leftJoin(mentoring.mentor, mentor)
                .leftJoin(mentoring.profile, profile)
                .leftJoin(mentoring.schedule, schedule)
                .where(mentorMatches(mentorId))
                .fetch();
    }

    private BooleanExpression mentorMatches(Long mentorId) {
        return mentoring.mentor.id.eq(mentorId);
    }

    private BooleanExpression isAccepted() {
        return mentoring.mentoringStatus.eq(Mentoring.MentoringStatus.ACCEPTED);
    }

    private BooleanExpression endTimeBeforeNow(LocalDateTime currentTime) {
        QSchedule schedule = QSchedule.schedule;
        return schedule.endDateTime.before(currentTime);
    }
}


