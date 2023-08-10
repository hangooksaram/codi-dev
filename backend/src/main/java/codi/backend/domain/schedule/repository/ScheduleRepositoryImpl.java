package codi.backend.domain.schedule.repository;

import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.schedule.dto.ScheduleDto;
import codi.backend.domain.schedule.entity.QSchedule;
import codi.backend.domain.schedule.entity.Schedule;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
                .map(s -> new ScheduleDto.ScheduleTimeResponse(
                        s.getStartDateTime().toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm")) + " - " + s.getEndDateTime().toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm")),
                        s.getMentoring() != null))
                .collect(Collectors.toList());
    }
}
