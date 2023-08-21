package codi.backend.domain.mentoring.controller;

import codi.backend.domain.mentoring.dto.MentoringDto;
import codi.backend.domain.mentoring.mapper.MentoringMapper;
import codi.backend.domain.mentoring.service.MentorMentoringService;
import codi.backend.global.response.MultiResponseDto;
import codi.backend.global.response.SingleResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@Api(tags = { "Mentor's Mentoring" })
@RestController
@RequestMapping("/api/v1/mentors/mentoring")
@Validated
@Slf4j
public class MentorMentoringController {
    private final MentorMentoringService mentoringService;
    private final MentoringMapper mentoringMapper;

    public MentorMentoringController(MentorMentoringService mentoringService, MentoringMapper mentoringMapper) {
        this.mentoringService = mentoringService;
        this.mentoringMapper = mentoringMapper;
    }

    // 받은 멘토링 수락 PATCH
    @ApiOperation(value = "Mentoring 수락", notes = "멘토가 신청된 멘토링을 수락한다.")
    @PatchMapping ("/{mentor-id}/{mentoring-id}/accept")
    public ResponseEntity acceptMentoring(@PathVariable("mentor-id") Long mentorId, @PathVariable("mentoring-id") Long mentoringId) {
        mentoringService.acceptMentoring(mentorId, mentoringId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 받은 멘토링 거절 PATCH
    @ApiOperation(value = "Mentoring 거절", notes = "멘토가 신청된 멘토링을 거절한다.")
    @PatchMapping("/{mentor-id}/{mentoring-id}/reject")
    public ResponseEntity rejectMentoring(@PathVariable("mentor-id") Long mentorId, @PathVariable("mentoring-id") Long mentoringId) {
        mentoringService.rejectMentoring(mentorId, mentoringId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 멘토링 링크 추가 PATCH
    @ApiOperation(value = "Mentoring 링크 추가", notes = "멘토가 멘토링을 할 플랫폼의 링크를 등록한다.")
    @PatchMapping("/{mentor-id}/{mentoring-id}/link")
    public ResponseEntity addMentoringLink(@PathVariable("mentor-id") Long mentorId, @PathVariable("mentoring-id") Long mentoringId, @Valid @RequestBody MentoringDto.MentoringLinkRequest mentoringLinkRequest) {
        mentoringService.addMentoringLink(mentorId, mentoringId, mentoringLinkRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 받은 신청 내역 전체 조회 GET
    @ApiOperation(value = "Mentoring 받은 신청 내역 전체 조회", notes = "신청된 모든 멘토링 정보를 조회한다. page 기본값 = 1, size 기본값 = 4")
    @GetMapping("/{mentor-id}/application")
    public ResponseEntity getAllMentoringApplication(@PathVariable("mentor-id") Long mentorId,
                                                     @RequestParam(required = false, defaultValue = "desc") String order,
                                                     @RequestParam(name = "size", required = false, defaultValue = "4") int size,
                                                     @RequestParam(name = "page", required = false, defaultValue = "1") int page) {
        Pageable pageable = PageRequest.of(page, size);
        Page<MentoringDto.MentoringApplicationResponse> applicantsPage = mentoringService.getAllMentoringApplication(mentorId, order, pageable);
        List<MentoringDto.MentoringApplicationResponse> applicantsList = applicantsPage.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(applicantsList, applicantsPage), HttpStatus.OK);
    }

    // 멘토링 조회(일별) GET
    @ApiOperation(value = "Mentor의 Mentoring 일별 조회", notes = "멘토가 특정 날짜의 멘토링을 조회한다.")
    @GetMapping("/daily/{mentor-id}")
    public ResponseEntity getDailyMentoring(@PathVariable("mentor-id") Long mentorId, @Valid MentoringDto.DailyRequest mentorDailyRequest) {
        MentoringDto.MentoringDailyMenteesResponse response = mentoringService.findDailyMentoringsOfMentor(mentorId, mentorDailyRequest.getDate());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 멘토링 조회(월별) GET
    @ApiOperation(value = "Mentor의 Mentoring 월별 조회", notes = "멘토가 한 달간의 멘토링을 조회한다.")
    @GetMapping("/monthly/{mentor-id}")
    public ResponseEntity getMonthlyMentoring(@PathVariable("mentor-id") Long mentorId, @Valid MentoringDto.MonthlyRequest monthlyRequest) {
        MentoringDto.MentoringMonthlyMenteesResponse response = mentoringService.findMonthlyMentoringsOfMentor(mentorId, monthlyRequest.getMonth());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
