package codi.backend.domain.schedule.repository;

import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.schedule.dto.*;
import codi.backend.domain.schedule.entity.Schedule;
import com.querydsl.core.types.dsl.*;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static codi.backend.domain.mentoring.entity.QMentoring.mentoring;
import static codi.backend.domain.schedule.entity.QSchedule.*;
import static codi.backend.domain.mentor.entity.QMentor.*;

@Repository
@Slf4j
public class ScheduleRepositoryImpl implements ScheduleRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    public ScheduleRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public List<ScheduleDto.ScheduleTempInfo> findDailySchedules(Mentor findMentor, LocalDate date) {
        return queryFactory
                .select(new QScheduleDto_ScheduleTempInfo(
                        schedule.startDateTime,
                        schedule.endDateTime,
                        schedule.mentoring.isNull()
                ))
                .from(schedule)
                .where(isEqualMentor(findMentor)
                        .and(isWithinSameDay(date)))
                .fetch();
    }

    private BooleanExpression isWithinSameDay(LocalDate date) {
        return schedule.startDateTime.goe(date.atStartOfDay())
                .and(schedule.endDateTime.lt(date.plusDays(1).atStartOfDay()));
    }

    private BooleanExpression isEqualMentor(Mentor mentor) {
        return schedule.mentor.eq(mentor);
    }

    @Override
    public List<ScheduleDto.ScheduleTempInfo> findMonthlySchedules(Mentor findMentor, LocalDate startDayOfMonth, LocalDate endDayOfMonth) {
        return queryFactory
                .select(new QScheduleDto_ScheduleTempInfo(
                        schedule.startDateTime,
                        schedule.endDateTime,
                        schedule.mentoring.isNull()
                ))
                .from(schedule)
                .where(isEqualMentor(findMentor)
                        .and(isWithinSameMonth(startDayOfMonth, endDayOfMonth)))
                .fetch();
    }

    private BooleanExpression isWithinSameMonth(LocalDate startDayOfMonth, LocalDate endDayOfMonth) {
        return schedule.startDateTime.goe(startDayOfMonth.atStartOfDay())
                .and(schedule.endDateTime.lt(endDayOfMonth.plusDays(1).atStartOfDay()));
    }

    @Override
    public List<Schedule> findAllByMentorAndDate(Mentor mentor, LocalDate date) {
        return queryFactory.selectFrom(schedule)
                .where(isEqualMentor(mentor),
                        startDateTimeGoe(date),
                        endDateTimeLt(date.plusDays(1)))
                .fetch();
    }

    @Override
    public long deleteAllByMentorAndDate(Mentor mentor, LocalDate date) {
        queryFactory
                .delete(schedule)
                .where(isEqualMentor(mentor),
                        startDateTimeGoe(date),
                        endDateTimeLt(date.plusDays(1)))
                .execute();
        return 0;
    }

    private BooleanExpression startDateTimeGoe(LocalDate date) {
        return schedule.startDateTime.goe(date.atStartOfDay());
    }

    private BooleanExpression endDateTimeLt(LocalDate date) {
        return schedule.endDateTime.lt(date.atStartOfDay());
    }

    @Override
    public List<ScheduleDto.ScheduleInfo> findSchedulesOfMentor(Long mentorId, LocalDateTime currentTime) {
        return queryFactory
                .select(new QScheduleDto_ScheduleInfo(
                        schedule.id,
                        schedule.startDateTime,
                        schedule.endDateTime,
                        schedule.mentor.id,
                        schedule.mentoring.id
                ))
                .from(schedule)
                .innerJoin(schedule.mentor, mentor)
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
