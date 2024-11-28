package codi.backend.domain.schedule.service;

import codi.backend.domain.member.repository.MemberRepository;
import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.mentor.service.MentorService;
import codi.backend.domain.schedule.dto.ScheduleDto;
import codi.backend.domain.schedule.entity.Schedule;
import codi.backend.domain.schedule.repository.ScheduleRepository;
import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.exception.ExceptionCode;
import codi.backend.global.utility.CustomDateUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ScheduleServiceImpl implements ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final MemberRepository memberRepository;
    private final MentorService mentorService;

    public ScheduleServiceImpl(ScheduleRepository scheduleRepository, MemberRepository memberRepository, MentorService mentorService) {
        this.scheduleRepository = scheduleRepository;
        this.memberRepository = memberRepository;
        this.mentorService = mentorService;
    }

    @Transactional
    @Override
    public void updateSchedule(Long mentorId, ScheduleDto.SchedulePut schedulePutDto) {
        Mentor findMentor = mentorService.findMentor(mentorId);
        LocalDate localDate = CustomDateUtils.parseDate(schedulePutDto.getDate());

        if (schedulePutDto.getTimes().isEmpty()) { // 스케줄이 아예 안넘어온 경우
            handleEmptySchedule(findMentor, localDate);
        } else {
            handleScheduleUpdate(findMentor, localDate, schedulePutDto);
        }
    }

    private void handleEmptySchedule(Mentor mentor, LocalDate date) {
        long deletedCount = scheduleRepository.deleteAllByMentorAndDate(mentor, date);
        log.info("날짜: {}, 삭제된 스케줄 수: {}", date, deletedCount);
    }

    private void handleScheduleUpdate(Mentor mentor, LocalDate date, ScheduleDto.SchedulePut schedulePutDto) {
        List<Schedule> newSchedules = convertToSchedules(mentor, schedulePutDto.getDate(), schedulePutDto.getTimes());
        List<Schedule> existingSchedules = scheduleRepository.findAllByMentorAndDate(mentor, date);

        updateSchedules(newSchedules, existingSchedules);
    }

    private void updateSchedules(List<Schedule> newSchedules, List<Schedule> existingSchedules) {
        Map<String, Schedule> existingScheduleMap = createScheduleMap(existingSchedules); // 기존 스케줄을 "HH:mm" - "HH:mm"으로 맵에 저장

        // 기존 스케줄
        List<Schedule> schedulesToAdd = new ArrayList<>();
        List<Schedule> schedulesToDelete = new ArrayList<>(existingSchedules);

        for (Schedule newSchedule : newSchedules) {
            String key = CustomDateUtils.formatTimeRange(newSchedule.getStartDateTime(), newSchedule.getEndDateTime());
            if (existingScheduleMap.containsKey(key)) {
                schedulesToDelete.remove(existingScheduleMap.get(key)); // 이미 존재하므로 삭제 리스트에서 제거
            } else {
                schedulesToAdd.add(newSchedule); // 존재하지 않으므로 추가 리스트에 추가
            }
        }

        deleteAndSaveSchedules(schedulesToDelete, schedulesToAdd);
    }

    private void deleteAndSaveSchedules(List<Schedule> schedulesToDelete, List<Schedule> schedulesToAdd) {
        if (!schedulesToDelete.isEmpty()) {
            scheduleRepository.deleteAll(filterSchedulesAllowedToDelete(schedulesToDelete)); // 삭제: 기존 스케줄에서 없어진 것들
        }
        if (!schedulesToAdd.isEmpty()) {
            scheduleRepository.saveAll(schedulesToAdd); // 추가: 새로운 스케줄에서 추가된 것들
        }
    }

    private Map<String, Schedule> createScheduleMap(List<Schedule> schedules) {
        return schedules.stream()
                .collect(Collectors.toMap(
                        s -> CustomDateUtils.formatTimeRange(s.getStartDateTime(), s.getEndDateTime()),
                        Function.identity()));
    }

    private List<Schedule> convertToSchedules(Mentor mentor, String date, List<ScheduleDto.TimeConstraint> times) {
        return times.stream()
                .map(time -> createSchedule(mentor, date, time.getTime()))
                .collect(Collectors.toList());
    }

    private Schedule createSchedule(Mentor mentor, String date, String time) {
        LocalDateTime[] divisionTime = CustomDateUtils.convertToStartAndEndTime(date, time);
        validateStartAndEndTime(divisionTime[0], divisionTime[1]);

        return Schedule.builder()
                .mentor(mentor)
                .startDateTime(divisionTime[0])
                .endDateTime(divisionTime[1])
                .build();
    }

    private void validateStartAndEndTime(LocalDateTime startTime, LocalDateTime endTime) {
        if (startTime.isAfter(endTime) || startTime.isEqual(endTime)) {
            throw new BusinessLogicException(ExceptionCode.START_TIME_AFTER_END_TIME_ERROR);
        }
    }

    private boolean isScheduleDeletable(Schedule schedule) {
        return schedule.getMentoring() == null; // 스케줄에 연결된 멘토링이 없으면 삭제 가능
    }

    private List<Schedule> filterSchedulesAllowedToDelete(List<Schedule> schedules) {
        return schedules.stream()
                .filter(this::isScheduleDeletable)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    @Override
    public Schedule findSchedule(Mentor mentor, LocalDateTime startTime, LocalDateTime endTime) {
        Schedule findSchedule = scheduleRepository.findByMentorAndStartDateTimeAndEndDateTime(mentor, startTime, endTime)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.SCHEDULE_NOT_FOUND));

        checkScheduleMentoring(findSchedule);

        return findSchedule;
    }

    private void checkScheduleMentoring(Schedule schedule) {
        if (schedule.getMentoring() != null) {
            throw new BusinessLogicException(ExceptionCode.MENTORING_ALREADY_EXIST);
        }
    }

    @Transactional(readOnly = true)
    @Override
    public ScheduleDto.ScheduleDailyResponse findDailySchedules(Long profileId, Long mentorId, String date) {
        Mentor findMentor = mentorService.findMentor(mentorId);
        LocalDate localDate = CustomDateUtils.parseDate(date);

        List<ScheduleDto.ScheduleTempInfo> scheduleTempInfos = scheduleRepository.findDailySchedules(findMentor, localDate);

        // temp infos의 날짜 포맷을 변경하여 schedule time responses에 저장하기
        List<ScheduleDto.ScheduleTimeResponse> scheduleTimeResponses = convertToScheduleTimeResponses(scheduleTempInfos);

        return ScheduleDto.ScheduleDailyResponse.builder()
                .date(CustomDateUtils.formatDate(localDate))
                .times(scheduleTimeResponses)
                .build();
    }

    private List<ScheduleDto.ScheduleTimeResponse> convertToScheduleTimeResponses(List<ScheduleDto.ScheduleTempInfo> scheduleTempInfos) {
        List<ScheduleDto.ScheduleTimeResponse> scheduleTimeResponses = new ArrayList<>();

        for (ScheduleDto.ScheduleTempInfo scheduleTempInfo : scheduleTempInfos) {
            String formattedTime = CustomDateUtils.formatTimeRange(scheduleTempInfo.getStartDateTime(), scheduleTempInfo.getEndDateTime());

            ScheduleDto.ScheduleTimeResponse scheduleTimeResponse = ScheduleDto.ScheduleTimeResponse.builder()
                    .time(formattedTime)
                    .enabled(scheduleTempInfo.getEnabled())
                    .build();

            scheduleTimeResponses.add(scheduleTimeResponse);
        }

        return scheduleTimeResponses;
    }


    @Transactional(readOnly = true)
    @Override
    public ScheduleDto.ScheduleMonthlyResponse findMonthlySchedules(Long profileId, Long mentorId, String month) {
        Mentor findMentor = mentorService.findMentor(mentorId);
        LocalDate localDateMonth = CustomDateUtils.parseMonthToDate(month);
        LocalDate startDayOfMonth = CustomDateUtils.getStartOfMonth(localDateMonth);
        LocalDate endDayOfMonth = CustomDateUtils.getEndOfMonth(localDateMonth);

        // Repository에서 Time Info List 받아오기
        List<ScheduleDto.ScheduleTempInfo> scheduleTempInfos = scheduleRepository.findMonthlySchedules(findMentor, startDayOfMonth, endDayOfMonth);

        // 날짜별로 그룹핑
        Map<LocalDate, List<ScheduleDto.ScheduleTempInfo>> groupedSchedules = groupSchedulesByDate(scheduleTempInfos);

        // ScheduleDailyResponses 리스트 만들기
        List<ScheduleDto.ScheduleDailyResponse> scheduleDailyResponses = createDailyResponses(groupedSchedules);

        return ScheduleDto.ScheduleMonthlyResponse.builder()
                .month(month)
                .days(scheduleDailyResponses)
                .build();
    }

    private Map<LocalDate, List<ScheduleDto.ScheduleTempInfo>> groupSchedulesByDate(List<ScheduleDto.ScheduleTempInfo> scheduleTempInfos) {
        Map<LocalDate, List<ScheduleDto.ScheduleTempInfo>> groupedSchedules = new HashMap<>();

        for (ScheduleDto.ScheduleTempInfo scheduleTempInfo : scheduleTempInfos) {
            LocalDate date = CustomDateUtils.LocalDateTimeConvertToLocalDate(scheduleTempInfo.getStartDateTime());
            groupedSchedules.computeIfAbsent(date, k -> new ArrayList<>()).add(scheduleTempInfo);
        }

        return groupedSchedules;
    }

    private List<ScheduleDto.ScheduleDailyResponse> createDailyResponses(Map<LocalDate, List<ScheduleDto.ScheduleTempInfo>> groupedSchedules) {
        List<ScheduleDto.ScheduleDailyResponse> scheduleDailyResponses = new ArrayList<>();

        // 날짜끼리 sort
        List<LocalDate> sortedDates = new ArrayList<>(groupedSchedules.keySet());
        Collections.sort(sortedDates);

        // 날짜별로 dailyResponse 리스트에 추가
        for (LocalDate date : sortedDates) {
            String formattedDate = CustomDateUtils.formatDate(date);
            List<ScheduleDto.ScheduleTempInfo> scheduleTempInfos = groupedSchedules.get(date);

            List<ScheduleDto.ScheduleTimeResponse> formattedScheduleTimeResponses = scheduleTempInfos
                    .stream()
                    .map(this::formatScheduleTempInfo)
                    .collect(Collectors.toList());

            ScheduleDto.ScheduleDailyResponse scheduleDailyResponse = ScheduleDto.ScheduleDailyResponse.builder()
                    .date(formattedDate)
                    .times(formattedScheduleTimeResponses)
                    .build();

            scheduleDailyResponses.add(scheduleDailyResponse);
        }

        return scheduleDailyResponses;
    }

    private ScheduleDto.ScheduleTimeResponse formatScheduleTempInfo(ScheduleDto.ScheduleTempInfo scheduleTempInfo) {
        String formattedTime = CustomDateUtils.formatTimeRange(scheduleTempInfo.getStartDateTime(), scheduleTempInfo.getEndDateTime());
        return ScheduleDto.ScheduleTimeResponse.builder()
                .time(formattedTime)
                .enabled(scheduleTempInfo.getEnabled())
                .build();
    }
}
