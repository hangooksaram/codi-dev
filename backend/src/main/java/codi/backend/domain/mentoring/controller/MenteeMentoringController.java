package codi.backend.domain.mentoring.controller;

import codi.backend.domain.mentoring.dto.MentoringDto;
import codi.backend.domain.mentoring.mapper.MentoringMapper;
import codi.backend.domain.mentoring.service.MenteeMentoringService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Api(tags = { "Mentee's Mentoring" })
@RestController
@RequestMapping("/api/v1/mentees/mentoring")
@Validated
@Slf4j
public class MenteeMentoringController {
    private final MenteeMentoringService mentoringService;
    private final MentoringMapper mentoringMapper;

    public MenteeMentoringController(MenteeMentoringService mentoringService, MentoringMapper mentoringMapper) {
        this.mentoringService = mentoringService;
        this.mentoringMapper = mentoringMapper;
    }

    // 멘토링 신청 POST
    @ApiOperation(value = "Mentoring 신청", notes = "멘티가 멘토의 id를 입력해서 멘토링을 신청할 수 있다.")
    @PostMapping("/{profile-id}/apply/{mentor-id}")
    public ResponseEntity applyMentoring(@PathVariable("profile-id") Long profileId,
                                         @PathVariable("mentor-id") Long mentorId,
                                         @Valid @RequestBody MentoringDto.MentoringPost mentoringPostDto) {
        MentoringDto.MentoringResponse response = mentoringMapper.mentoringToMentoringResponse(mentoringService.createMentoring(profileId, mentorId, mentoringPostDto));
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 멘토링 신청 취소 PATCH
    @ApiOperation(value = "Mentoring 신청 취소", notes = "멘티가 멘토의 id를 입력해서 이전에 신청했던 멘토링을 취소할 수 있다.")
    @PatchMapping("{profile-id}/applications/{mentoring-id}/cancel")
    public ResponseEntity cancelMentoring(@PathVariable("profile-id") Long profileId,
                                          @PathVariable("mentoring-id") Long mentoringId) {
        mentoringService.cancelMentoring(profileId, mentoringId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 월별 멘토링 조회

    // 일별 멘토링 조회

    // 멘토 평가 POST
    @ApiOperation(value = "Mentoring 후 Mentor 평가", notes = "멘티가 멘토링과 멘토 정보, 별점을 입력해서 평가할 수 있다. 다른 request 필드가 많아서 RequestBody에 입력받는다.")
    @PostMapping("/rate")
    public ResponseEntity rateMentor(@Valid @RequestBody MentoringDto.RateMentorRequest rateMentorRequest) {
        mentoringService.rateMentor(rateMentorRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
