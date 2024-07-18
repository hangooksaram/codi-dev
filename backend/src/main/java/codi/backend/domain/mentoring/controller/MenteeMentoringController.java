package codi.backend.domain.mentoring.controller;

import codi.backend.auth.userdetails.CustomUserDetails;
import codi.backend.domain.mentoring.dto.MentoringDto;
import codi.backend.domain.mentoring.service.MenteeMentoringService;
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
import java.util.List;

@Tag(name = "Mentee's Mentoring", description = "멘티가 사용 가능한 멘토링 API")
@RestController
@RequestMapping("/api/v1/mentees/mentoring")
@Validated
@Slf4j
public class MenteeMentoringController {
    private final MenteeMentoringService mentoringService;

    public MenteeMentoringController(MenteeMentoringService mentoringService) {
        this.mentoringService = mentoringService;
    }

    // 멘토링 신청 POST
    @Operation(summary = "Mentoring 신청", description = "멘티가 멘토의 id를 입력해서 멘토링을 신청할 수 있다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "멘토링 신청", content =
                    { @Content(mediaType = "application/json")})
    })
    @PostMapping("/apply/{mentor-id}")
    public ResponseEntity mentoringAdd(@AuthenticationPrincipal CustomUserDetails principal,
                                       @PathVariable("mentor-id") Long mentorId,
                                       @Valid @RequestBody MentoringDto.MentoringPost mentoringPostDto) {
        mentoringService.createMentoring(principal.getProfileId(), mentorId, mentoringPostDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // 멘토링 신청 취소 PATCH
    @Operation(summary = "Mentoring 신청 취소", description = "멘티가 멘토의 id를 입력해서 이전에 신청했던 멘토링을 취소할 수 있다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "신청한 멘토링 취소", content =
                    { @Content(mediaType = "application/json")})
    })
    @PatchMapping("/applications/{mentoring-id}/cancel")
    public ResponseEntity cancelMentoring(@AuthenticationPrincipal CustomUserDetails principal,
                                          @PathVariable("mentoring-id") Long mentoringId) {
        mentoringService.cancelMentoring(principal.getProfileId(), mentoringId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 일별 멘토링 조회 GET
    @Operation(summary = "Mentee의 Mentoring 일별 조회", description = "멘티가 특정 날짜의 멘토링을 조회한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "일별 멘토링 조회", content =
                    { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = MentoringDto.MentoringDailyMentorsResponse.class))})
    })
    @GetMapping("/daily")
    public ResponseEntity getDailyMentoring(@AuthenticationPrincipal CustomUserDetails principal, @Valid MentoringDto.DailyRequest menteeDailyRequest) {
        MentoringDto.MentoringDailyMentorsResponse response = mentoringService.findDailyMentoringsOfMentee(principal.getProfileId(), menteeDailyRequest.getDate());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 월별 멘토링 조회 GET
    @Operation(summary = "Mentee의 Mentoring 월별 조회", description = "멘티가 한 달간의 멘토링을 조회한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "월별 멘토링 조회", content =
                    { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = MentoringDto.MentoringMonthlyMentorsResponse.class))})
    })
    @GetMapping("/monthly")
    public ResponseEntity getMonthlyMentoring(@AuthenticationPrincipal CustomUserDetails principal, @Valid MentoringDto.MonthlyRequest monthlyRequest) {
        MentoringDto.MentoringMonthlyMentorsResponse response = mentoringService.findMonthlyMentoringsOfMentee(principal.getProfileId(), monthlyRequest.getMonth());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 멘토 평가 POST
    // TODO 멘토 평가 프로세스를 다시 체크해봐야 할듯, 로그인 한 상태로 이용할 수 있는 기능이기 때문에 중요하다.
    @Operation(summary = "Mentoring 후 Mentor 평가(수정 필요)", description = "멘티가 멘토링과 멘토 정보, 별점을 입력해서 평가할 수 있다. 다른 request 필드가 많아서 RequestBody에 입력받는다.")
    @PostMapping("/rate")
    public ResponseEntity rateMentor(@Valid @RequestBody MentoringDto.RateMentorRequest rateMentorRequest) {
        mentoringService.rateMentor(rateMentorRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 오늘의 멘토링 조회 GET
    @Operation(summary = "오늘의 멘토링 스케줄 조회", description = "오늘을 기준으로 4개의 멘토링에 대한 정보를 시간이 빠른 순서대로 나열한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "오늘의 멘토링 조회", content =
                    { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = MentoringDto.TodayMentoringInfoResponse.class))})
    })
    @GetMapping("/mentoring-schedules")
    public ResponseEntity getMentoringSchedules(@AuthenticationPrincipal CustomUserDetails principal) {
        List<MentoringDto.TodayMentoringInfoResponse> responses = mentoringService.findMentoringSchedules(principal.getProfileId());
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }
}
