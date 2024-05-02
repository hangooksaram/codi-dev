package codi.backend.domain.schedule.service;

import codi.backend.domain.member.repository.MemberRepository;
import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.mentor.service.MentorService;
import codi.backend.domain.schedule.dto.ScheduleDto;
import codi.backend.domain.schedule.entity.Schedule;
import codi.backend.domain.schedule.repository.ScheduleRepository;
import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.exception.ExceptionCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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
    public void updateSchedule(Long mentorId, ScheduleDto.Put putDto) {
        Mentor mentor = mentorService.findMentor(mentorId);
        LocalDate localDate = LocalDate.parse(putDto.getDate(), DateTimeFormatter.ofPattern("yyyy/MM/dd"));

        if (putDto.getTimes().isEmpty()) { // 스케줄이 아예 안넘어온 경우
            scheduleRepository.deleteAllByMentorAndDate(mentor, localDate); // 필요시 long 타입 반환받아서 로그 찍기
            log.info("날짜: " + localDate + "\n해당 날짜의 스케줄 전체 삭제가 완료됐습니다.");
        } else {
            List<Schedule> newSchedules = convertToSchedules(mentor, putDto.getDate(), putDto.getTimes());
            List<Schedule> existingSchedules = scheduleRepository.findAllByMentorAndDate(mentor, localDate);

            // 기존 스케줄을 시작시간-종료시간으로 맵에 저장
            Map<String, Schedule> existingScheduleMap = existingSchedules.stream()
                    .collect(Collectors.toMap(
                            s -> s.getStartDateTime() + "-" + s.getEndDateTime(),
                            Function.identity())); // 원본 Schedule 객체값 사용

            // 기존 스케줄
            List<Schedule> schedulesToAdd = new ArrayList<>();
            List<Schedule> schedulesToDelete = new ArrayList<>(existingSchedules);

            for (Schedule newSchedule : newSchedules) {
                String key = newSchedule.getStartDateTime() + "-" + newSchedule.getEndDateTime();
                if (existingScheduleMap.containsKey(key)) {
                    schedulesToDelete.remove(existingScheduleMap.get(key)); // 이미 존재하므로 삭제 리스트에서 제거
                } else {
                    schedulesToAdd.add(newSchedule); // 존재하지 않으므로 추가 리스트에 추가
                }
            }

            // 삭제: 기존 스케줄에서 없어진 것들
            scheduleRepository.deleteAll(filterSchedulesAllowedToDelete(schedulesToDelete));

            // 추가: 새로운 스케줄에서 추가된 것들
            scheduleRepository.saveAll(schedulesToAdd);
        }
    }

    private List<Schedule> convertToSchedules(Mentor mentor, String date, List<ScheduleDto.TimeConstraint> times) {
        return times.stream()
                .map(time -> createSchedule(mentor, date, time.getTime()))
                .collect(Collectors.toList());
    }

    private Schedule createSchedule(Mentor mentor, String date, String time) {
        LocalDateTime[] divisionTime = convertToStartAndEndTime(date, time);
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

    @Override
    public LocalDateTime[] convertToStartAndEndTime(String date, String time) {
        String[] divisionTime = time.split(" - ");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm");
        return new LocalDateTime[]{
                LocalDateTime.parse(date + " " + divisionTime[0], formatter),
                LocalDateTime.parse(date + " " + divisionTime[1], formatter)
        };
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
        return scheduleRepository
                .findByMentorAndStartDateTimeAndEndDateTime(mentor, startTime, endTime)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.SCHEDULE_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    @Override
    public void checkScheduleMentoring(Schedule schedule) {
        if (schedule.getMentoring() != null) {
            throw new BusinessLogicException(ExceptionCode.MENTORING_ALREADY_EXIST);
        }
    }

    @Transactional(readOnly = true)
    @Override
    public ScheduleDto.ScheduleDailyResponse findDailySchedules(Long profileId, Long mentorId, String date) {
        Mentor mentor = mentorService.findMentor(mentorId);
        LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy/MM/dd"));
        return scheduleRepository.findDailySchedules(mentor, localDate);
    }

    @Transactional(readOnly = true)
    @Override
    public ScheduleDto.ScheduleMonthlyResponse findMonthlySchedules(Long profileId, Long mentorId, String month) {
        Mentor mentor = mentorService.findMentor(mentorId);
        LocalDate localDateMonth = LocalDate.parse(month + "/01", DateTimeFormatter.ofPattern("yyyy/MM/dd"));
        return scheduleRepository.findMonthlySchedules(mentor, localDateMonth);
    }
}
