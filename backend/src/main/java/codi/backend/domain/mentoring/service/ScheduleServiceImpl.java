package codi.backend.domain.mentoring.service;

import codi.backend.domain.member.repository.MemberRepository;
import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.mentor.repository.MentorRepository;
import codi.backend.domain.mentoring.dto.ScheduleDto;
import codi.backend.domain.mentoring.entity.Schedule;
import codi.backend.domain.mentoring.repository.ScheduleRepository;
import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.exception.ExceptionCode;
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

@Transactional
@Service
public class ScheduleServiceImpl implements ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final MemberRepository memberRepository;
    private final MentorRepository mentorRepository;

    public ScheduleServiceImpl(ScheduleRepository scheduleRepository, MemberRepository memberRepository, MentorRepository mentorRepository) {
        this.scheduleRepository = scheduleRepository;
        this.memberRepository = memberRepository;
        this.mentorRepository = mentorRepository;
    }

    @Override
    public void registerSchedule(Long mentorId, ScheduleDto.SchedulePostDto schedulePostDto) {
        Mentor mentor = findMentor(mentorId);
        List<Schedule> newSchedules = convertToSchedules(mentor, schedulePostDto.getDate(), schedulePostDto.getTimes());
        List<Schedule> existingSchedules = scheduleRepository.findAllByMentor(mentor);

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

    private Mentor findMentor(Long mentorId) {
        return mentorRepository.findById(mentorId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_MENTOR_ERROR));
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

    private LocalDateTime[] convertToStartAndEndTime(String date, String time) {
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
}
