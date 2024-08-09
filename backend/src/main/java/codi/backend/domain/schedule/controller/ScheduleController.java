package codi.backend.domain.schedule.controller;

import codi.backend.auth.userdetails.CustomUserDetails;
import codi.backend.domain.schedule.dto.ScheduleDto;
import codi.backend.domain.schedule.service.ScheduleService;
import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.exception.ExceptionCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@Tag(name = "Schedule", description = "멘토링 일정 API")
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
    @Operation(summary = "Schedule 등록 및 수정", description = "멘토가 스케줄을 등록 및 변경할 수 있다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "스케줄 생성 및 수정", content =
                    { @Content(mediaType = "application/json")})
    })
    @PutMapping
    public ResponseEntity postSchedule(@AuthenticationPrincipal CustomUserDetails principal,
                                       @Valid @RequestBody ScheduleDto.SchedulePut schedulePutDto) {
        scheduleService.updateSchedule(principal.getMentorId(), schedulePutDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 스케줄 조회(일별) GET - 로그인 한 사용자만 사용할 수 있다.
    @Operation(summary = "Schedule 일별 조회", description = "특정 날짜의 스케줄을 조회할 수 있다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "일별 스케줄 조회", content =
                    { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ScheduleDto.ScheduleDailyResponse.class))})
    })
    @GetMapping(value = {"/daily", "/daily/{mentor-id}"})
    public ResponseEntity getDailySchedule(@AuthenticationPrincipal CustomUserDetails principal,
                                           @PathVariable(name = "mentor-id", required = false) Long mentorId,
                                           @Valid ScheduleDto.DailyRequest dailyRequest) {
        Long curMentorId = validateAndGetMentorId(principal, mentorId);
        ScheduleDto.ScheduleDailyResponse response = scheduleService.findDailySchedules(principal.getProfileId(), curMentorId, dailyRequest.getDate());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 스케줄 조회(월별) GET - 로그인 한 사용자만 사용할 수 있다.
    @Operation(summary = "Schedule 월별 조회", description = "한 달간의 스케줄을 조회할 수 있다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "월별 스케줄 조회", content =
                    { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ScheduleDto.ScheduleMonthlyResponse.class))})
    })
    @GetMapping(value = {"/monthly", "/monthly/{mentor-id}"})
    public ResponseEntity getMonthlySchedule(@AuthenticationPrincipal CustomUserDetails principal,
                                             @PathVariable(name = "mentor-id", required = false) Long mentorId,
                                             @Valid ScheduleDto.MonthlyRequest monthlyRequest) {
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
