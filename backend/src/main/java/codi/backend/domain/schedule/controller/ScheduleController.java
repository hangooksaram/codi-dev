package codi.backend.domain.schedule.controller;

import codi.backend.auth.userdetails.CustomUserDetails;
import codi.backend.domain.schedule.dto.ScheduleDto;
import codi.backend.domain.schedule.service.ScheduleService;
import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.exception.ExceptionCode;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@Api(tags = { "Schedule" })
@RestController
@RequestMapping("/api/v1/schedule")
@Validated
@Slf4j
public class ScheduleController {
    private final ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    // 멘토 스케줄 등록 및 수정 PUT
    @ApiOperation(value = "Schedule 등록 및 수정", notes = "멘토가 스케줄을 등록 및 변경할 수 있다.")
    @PutMapping
    public ResponseEntity postSchedule(@AuthenticationPrincipal CustomUserDetails principal, @Valid @RequestBody ScheduleDto.Put putDto) {
        scheduleService.updateSchedule(principal.getMentorId(), putDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 스케줄 조회(일별) GET - 로그인 한 사용자만 사용할 수 있다.
    @ApiOperation(value = "Schedule 일별 조회", notes = "특정 날짜의 스케줄을 조회할 수 있다.")
    @GetMapping(value = {"/daily", "/daily/{mentor-id}"})
    public ResponseEntity getDailySchedule(@AuthenticationPrincipal CustomUserDetails principal, @PathVariable(name = "mentor-id", required = false) Long mentorId, @Valid ScheduleDto.DailyRequest dailyRequest) {
        Long curMentorId = validateAndGetMentorId(principal, mentorId);
        ScheduleDto.ScheduleDailyResponse response = scheduleService.findDailySchedules(principal.getProfileId(), curMentorId, dailyRequest.getDate());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 스케줄 조회(월별) GET - 로그인 한 사용자만 사용할 수 있다.
    @ApiOperation(value = "Schedule 월별 조회", notes = "한 달간의 스케줄을 조회할 수 있다.")
    @GetMapping(value = {"/monthly", "/monthly/{mentor-id}"})
    public ResponseEntity getMonthlySchedule(@AuthenticationPrincipal CustomUserDetails principal, @PathVariable(name = "mentor-id", required = false) Long mentorId, @Valid ScheduleDto.MonthlyRequest monthlyRequest) {
        Long curMentorId = validateAndGetMentorId(principal, mentorId);
        ScheduleDto.ScheduleMonthlyResponse response = scheduleService.findMonthlySchedules(principal.getProfileId(), curMentorId, monthlyRequest.getMonth());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private Long validateAndGetMentorId(CustomUserDetails principal, Long mentorId) {
        if (principal.getProfileId() == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_PROFILE_ERROR);
        }
        if (mentorId == null && principal.getMentorId() == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_MENTOR_ERROR);
        }
        return Optional.ofNullable(mentorId).orElse(principal.getMentorId());
    }
}
