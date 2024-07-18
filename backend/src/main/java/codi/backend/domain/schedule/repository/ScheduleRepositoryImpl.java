package codi.backend.domain.schedule.repository;

import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.mentor.entity.QMentor;
import codi.backend.domain.mentoring.entity.QMentoring;
import codi.backend.domain.schedule.dto.QScheduleDto_ScheduleInfo;
import codi.backend.domain.schedule.dto.ScheduleDto;
import codi.backend.domain.schedule.entity.QSchedule;
import codi.backend.domain.schedule.entity.Schedule;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public class ScheduleRepositoryImpl implements ScheduleRepositoryCustom {
    private final JPAQueryFactory queryFactory;
    private final QSchedule schedule = QSchedule.schedule;

    public ScheduleRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public ScheduleDto.ScheduleDailyResponse findDailySchedules(Mentor mentor, LocalDate date) {
        List<Schedule> schedules = queryFactory.selectFrom(schedule)
                .where(schedule.mentor.eq(mentor)
                        .and(schedule.startDateTime.goe(date.atStartOfDay())
                                .and(schedule.endDateTime.lt(date.plusDays(1).atStartOfDay()))))
                .fetch();

        List<ScheduleDto.ScheduleTimeResponse> scheduleTimeResponses = mapToTimeResponses(schedules);

        return ScheduleDto.ScheduleDailyResponse.builder()
                .date(date.format(DateTimeFormatter.ofPattern("yyyy/MM/dd")))
                .times(scheduleTimeResponses)
                .build();
    }

    @Override
    public ScheduleDto.ScheduleMonthlyResponse findMonthlySchedules(Mentor mentor, LocalDate month) {
        LocalDate startOfMonth = month.withDayOfMonth(1);
        LocalDate endOfMonth = month.withDayOfMonth(month.lengthOfMonth());

        List<Schedule> monthlySchedules = queryFactory.selectFrom(schedule)
                .where(schedule.mentor.eq(mentor)
                        .and(schedule.startDateTime.goe(startOfMonth.atStartOfDay())
                                .and(schedule.endDateTime.lt(endOfMonth.plusDays(1).atStartOfDay()))))
                .fetch();

        Map<LocalDate, List<Schedule>> groupedByDate = monthlySchedules.stream()
                .collect(Collectors.groupingBy(s -> s.getStartDateTime().toLocalDate()));

        List<ScheduleDto.ScheduleDailyResponse> dailyResponses = groupedByDate.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .map(entry -> {
                    LocalDate date = entry.getKey();
                    List<Schedule> dailySchedules = entry.getValue();

                    List<ScheduleDto.ScheduleTimeResponse> scheduleTimeResponses = mapToTimeResponses(dailySchedules);

                    return ScheduleDto.ScheduleDailyResponse.builder()
                            .date(date.format(DateTimeFormatter.ofPattern("yyyy/MM/dd")))
                            .times(scheduleTimeResponses)
                            .build();
                })
                .collect(Collectors.toList());

        return ScheduleDto.ScheduleMonthlyResponse.builder()
                .month(month.format(DateTimeFormatter.ofPattern("yyyy/MM")))
                .days(dailyResponses)
                .build();
    }

    private List<ScheduleDto.ScheduleTimeResponse> mapToTimeResponses(List<Schedule> schedules) {
        return schedules.stream()
                .sorted(Comparator.comparing(Schedule::getStartDateTime))
                .map(s -> new ScheduleDto.ScheduleTimeResponse(
                        s.getStartDateTime().toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm")) + " - " + s.getEndDateTime().toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm")),
                        s.getMentoring() == null))
                .collect(Collectors.toList());
    }

    @Override
    public List<Schedule> findAllByMentorAndDate(Mentor mentor, LocalDate date) {
        return queryFactory.selectFrom(schedule)
                .where(schedule.mentor.eq(mentor),
                        startDateTimeGoe(date),
                        endDateTimeLt(date.plusDays(1)))
                .fetch();
    }

    @Override
    public Long deleteAllByMentorAndDate(Mentor mentor, LocalDate date) {
        return queryFactory
                .delete(schedule)
                .where(schedule.mentor.eq(mentor),
                        startDateTimeGoe(date),
                        endDateTimeLt(date.plusDays(1)))
                .execute();
    }

    private BooleanExpression startDateTimeGoe(LocalDate date) {
        return schedule.startDateTime.goe(date.atStartOfDay());
    }

    private BooleanExpression endDateTimeLt(LocalDate date) {
        return schedule.endDateTime.lt(date.atStartOfDay());
    }

    @Override
    public List<ScheduleDto.ScheduleInfo> findSchedulesOfMentor(Long mentorId, LocalDateTime currentTime) {
        QMentor mentor = QMentor.mentor;
        QMentoring mentoring = QMentoring.mentoring;

        return queryFactory
                .select(new QScheduleDto_ScheduleInfo(
                        schedule.id,
                        schedule.startDateTime,
                        schedule.endDateTime,
                        schedule.mentor.id,
                        schedule.mentoring.id
                ))
                .from(schedule)
                .leftJoin(schedule.mentor, mentor)
                .leftJoin(schedule.mentoring, mentoring)
                .where(mentorScheduleMatches(mentorId)
                        .and(startTimeAfterNow(currentTime)))
                .fetch();
    }

    private BooleanExpression mentorScheduleMatches(Long mentorId) {
        return schedule.mentor.id.eq(mentorId);
    }

    private BooleanExpression startTimeAfterNow(LocalDateTime currentTime) {
        return schedule.startDateTime.after(currentTime);
    }
}
