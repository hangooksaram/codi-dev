package codi.backend.domain.mentoring.controller;

import codi.backend.auth.userdetails.CustomUserDetails;
import codi.backend.domain.mentoring.dto.MentoringDto;
import codi.backend.domain.mentoring.service.MentorMentoringService;
import codi.backend.global.response.MultiResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Tag(name = "Mentor's Mentoring", description = "멘토 기준 멘토링 API")
@RestController
@RequestMapping("/api/v1/mentors/mentoring")
@Validated
@Slf4j
public class MentorMentoringController {
    private final MentorMentoringService mentoringService;

    public MentorMentoringController(MentorMentoringService mentoringService) {
        this.mentoringService = mentoringService;
    }

    // 받은 멘토링 수락 PATCH
    @Operation(summary = "Mentoring 수락", description = "멘토가 신청된 멘토링을 수락한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "신청된 멘토링 수락", content =
                    { @Content(mediaType = "application/json")})
    })
    @PatchMapping ("/{mentoring-id}/accept")
    public ResponseEntity acceptMentoring(@AuthenticationPrincipal CustomUserDetails principal, @PathVariable("mentoring-id") Long mentoringId) {
        mentoringService.acceptMentoring(principal.getMentorId(), mentoringId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 받은 멘토링 거절 PATCH
    @Operation(summary = "Mentoring 거절", description = "멘토가 신청된 멘토링을 거절한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "신청된 멘토링 거절", content =
                    { @Content(mediaType = "application/json")})
    })
    @PatchMapping("/{mentoring-id}/reject")
    public ResponseEntity rejectMentoring(@AuthenticationPrincipal CustomUserDetails principal, @PathVariable("mentoring-id") Long mentoringId) {
        mentoringService.rejectMentoring(principal.getMentorId(), mentoringId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 멘토링 링크 추가 PATCH
    @Operation(summary = "Mentoring 링크 추가", description = "멘토가 멘토링을 할 플랫폼의 링크를 등록한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "수락한 멘토링에 플랫폼 링크 추가", content =
                    { @Content(mediaType = "application/json")})
    })
    @PatchMapping("/{mentoring-id}/link")
    public ResponseEntity addMentoringLink(@AuthenticationPrincipal CustomUserDetails principal,
                                           @PathVariable("mentoring-id") Long mentoringId,
                                           @Valid @RequestBody MentoringDto.MentoringLinkRequest mentoringLinkRequest) {
        mentoringService.addMentoringLink(principal.getMentorId(), mentoringId, mentoringLinkRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 받은 신청 내역 전체 조회 GET
    @Operation(summary = "Mentoring 받은 신청 내역 전체 조회", description = "신청된 모든 멘토링 정보를 조회한다. page 기본값 = 1, size 기본값 = 4")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "신청된 멘토링 전체 조회", content =
                    { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = MultiResponseDto.class),
                            examples = @ExampleObject(name = "받은 신청 내역 전체 조회 example",
                                    value = "{\n" +
                                            "    \"data\": [\n" +
                                            "        {\n" +
                                            "            \"mentoringId\": 0,\n" +
                                            "            \"menteeInfo\": {\n" +
                                            "                \"profileId\": \"프로필 아이디\",\n" +
                                            "                \"nickname\": \"별명\",\n" +
                                            "                \"imgUrl\": \"프로필 이미지\",\n" +
                                            "                \"desiredJob\": \"직무\",\n" +
                                            "                \"disability\": \"장애 유형\",\n" +
                                            "                \"severity\": \"중증도\",\n" +
                                            "                \"employmentStatus\": \"멘티의 현재 상태\"\n" +
                                            "            },\n" +
                                            "            \"applicationDate\": \"yyyy/mm/dd (요일) hh:mm - hh:mm\",\n" +
                                            "            \"applicationReason\": \"신청 사유\",\n" +
                                            "            \"mentoringStatus\": \"멘토링 상태\",\n" +
                                            "            \"isDatePassed\": \"멘토링 날짜 확인\"\n" +
                                            "        }\n" +
                                            "    ],\n" +
                                            "    \"pageInfo\": {\n" +
                                            "        \"page\": 0,\n" +
                                            "        \"size\": 0,\n" +
                                            "        \"totalElements\": 0,\n" +
                                            "        \"totalPages\": 0\n" +
                                            "    }\n" +
                                            "}"
                            ))})
    })
    @GetMapping("/application")
    public ResponseEntity getAllMentoringApplication(@AuthenticationPrincipal CustomUserDetails principal,
                                                     @RequestParam(required = false, defaultValue = "desc") String order,
                                                     @RequestParam(name = "size", required = false, defaultValue = "4") int size,
                                                     @RequestParam(name = "page", required = false, defaultValue = "1") int page) {
        Pageable pageable = PageRequest.of(page, size);
        Page<MentoringDto.MentoringApplicationResponse> applicantsPage = mentoringService.getAllMentoringApplication(principal.getMentorId(), order, pageable);
        List<MentoringDto.MentoringApplicationResponse> applicantsList = applicantsPage.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(applicantsList, applicantsPage), HttpStatus.OK);
    }

    // 멘토링 조회(일별) GET
    @Operation(summary = "Mentor의 Mentoring 일별 조회", description = "멘토가 특정 날짜의 멘토링을 조회한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "일별 멘토링 조회", content =
                    { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = MentoringDto.MentoringDailyMenteesResponse.class))})
    })
    @GetMapping("/daily")
    public ResponseEntity getDailyMentoring(@AuthenticationPrincipal CustomUserDetails principal, @Valid MentoringDto.DailyRequest mentorDailyRequest) {
        MentoringDto.MentoringDailyMenteesResponse response = mentoringService.findDailyMentoringsOfMentor(principal.getMentorId(), mentorDailyRequest.getDate());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 멘토링 조회(월별) GET
    @Operation(summary = "Mentor의 Mentoring 월별 조회", description = "멘토가 한 달간의 멘토링을 조회한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "일별 멘토링 조회", content =
                    { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = MentoringDto.MentoringMonthlyMentorsResponse.class))})
    })
    @GetMapping("/monthly")
    public ResponseEntity getMonthlyMentoring(@AuthenticationPrincipal CustomUserDetails principal, @Valid MentoringDto.MonthlyRequest monthlyRequest) {
        MentoringDto.MentoringMonthlyMenteesResponse response = mentoringService.findMonthlyMentoringsOfMentor(principal.getMentorId(), monthlyRequest.getMonth());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
