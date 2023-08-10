package codi.backend.domain.mentoring.controller;

import codi.backend.domain.mentoring.dto.MentoringDto;
import codi.backend.domain.mentoring.mapper.MentoringMapper;
import codi.backend.domain.mentoring.service.MentorMentoringService;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

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

    // 받은 멘토링 수락
    @PatchMapping ("/{mentor-id}/{mentoring-id}/accept")
    public ResponseEntity acceptMentoring(@PathVariable("mentor-id") Long mentorId, @PathVariable("mentoring-id") Long mentoringId) {
        mentoringService.acceptMentoring(mentorId, mentoringId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 받은 멘토링 거절
    @PatchMapping("/{mentor-id}/{mentoring-id}/reject")
    public ResponseEntity rejectMentoring(@PathVariable("mentor-id") Long mentorId, @PathVariable("mentoring-id") Long mentoringId) {
        mentoringService.rejectMentoring(mentorId, mentoringId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 멘토링 링크 추가
    @PatchMapping("/{mentor-id}/{mentoring-id}/link")
    public ResponseEntity addMentoringLink(@PathVariable("mentor-id") Long mentorId, @PathVariable("mentoring-id") Long mentoringId, @Valid @RequestBody MentoringDto.MentoringLinkRequest mentoringLinkRequest) {
        mentoringService.addMentoringLink(mentorId, mentoringId, mentoringLinkRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 받은 신청 내역 전체 조회
    @GetMapping("/{mentor-id}")
    public ResponseEntity getAllMentoringApplication(@PathVariable("mentor-id") Long mentorId) {
        return null;
    }

    // 월별 멘토링 조회

    // 일별 멘토링 조회
}
