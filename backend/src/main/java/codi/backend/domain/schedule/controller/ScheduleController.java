package codi.backend.domain.schedule.controller;

import codi.backend.domain.schedule.dto.ScheduleDto;
import codi.backend.domain.schedule.service.ScheduleService;
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
public class ScheduleController {
    private final ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    // 멘토 스케줄 등록 및 수정 POST
    @ApiOperation(value = "Schedule 등록 및 수정", notes = "멘토가 스케줄을 등록 및 변경할 수 있다.")
    @PostMapping("/{mentor-id}")
    public ResponseEntity postSchedule(@PathVariable("mentor-id") Long mentorId, @Valid @RequestBody ScheduleDto.SchedulePostDto schedulePostDto) {
        scheduleService.registerSchedule(mentorId, schedulePostDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 스케줄 조회(월별) GET

    // 스케줄 조회(일별) GET
}
