package codi.backend.domain.schedule.controller;

import codi.backend.domain.schedule.dto.ScheduleDto;
import codi.backend.domain.schedule.service.ScheduleService;
import codi.backend.global.response.SingleResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Api(tags = { "Schedule" })
@RestController
@RequestMapping("/api/v1/schedule")
@Validated
@Slf4j
public class MentorScheduleController {
    private final ScheduleService scheduleService;

    public MentorScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    // 멘토 스케줄 등록 및 수정 POST
    @ApiOperation(value = "Schedule 등록 및 수정", notes = "멘토가 스케줄을 등록 및 변경할 수 있다.")
    @PostMapping("/{mentor-id}")
    public ResponseEntity postSchedule(@PathVariable("mentor-id") Long mentorId, @Valid @RequestBody ScheduleDto.SchedulePostDto schedulePostDto) {
        scheduleService.registerSchedule(mentorId, schedulePostDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 스케줄 조회(일별) GET
    @ApiOperation(value = "Schedule 일별 조회", notes = "멘토가 특정 날짜의 스케줄을 조회할 수 있다.")
    @GetMapping("/daily/{mentor-id}")
    public ResponseEntity getDailySchedule(@PathVariable("mentor-id") Long mentorId, @Valid ScheduleDto.DailyRequest dailyRequest) {
        ScheduleDto.ScheduleDailyResponse response = scheduleService.findDailySchedules(mentorId, dailyRequest.getDate());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 스케줄 조회(월별) GET
    @ApiOperation(value = "Schedule 월별 조회", notes = "멘토가 한 달간의 스케줄을 조회할 수 있다.")
    @GetMapping("/monthly/{mentor-id}")
    public ResponseEntity getMonthlySchedule(@PathVariable("mentor-id") Long mentorId, @Valid ScheduleDto.MonthlyRequest monthlyRequest) {
        ScheduleDto.ScheduleMonthlyResponse response = scheduleService.findMonthlySchedules(mentorId, monthlyRequest.getMonth());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
