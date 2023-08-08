package codi.backend.domain.mentoring.controller;

import codi.backend.domain.mentoring.dto.MentoringDto;
import codi.backend.domain.mentoring.mapper.MentoringMapper;
import codi.backend.domain.mentoring.service.MentoringService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Api(tags = { "Mentoring" })
@RestController
@RequestMapping("/api/v1/mentoring")
@Validated
@Slf4j
public class MentoringController {
    private final MentoringService mentoringService;
    private final MentoringMapper mentoringMapper;

    public MentoringController(MentoringService mentoringService, MentoringMapper mentoringMapper) {
        this.mentoringService = mentoringService;
        this.mentoringMapper = mentoringMapper;
    }

    // 멘토링 신청 POST
    @ApiOperation(value = "Mentoring 신청", notes = "멘티가 멘토의 id를 입력해서 멘토링을 신청할 수 있다.")
    @PostMapping("/{profile-id}/apply/{mentor-id}")
    public ResponseEntity applyMentoring(@PathVariable("profile-id") Long profileId,
                                         @PathVariable("mentor-id") Long mentorId,
                                         @Valid @RequestBody MentoringDto.MentoringPost mentoringPostDto) {
        MentoringDto.MentoringResponse response = mentoringMapper.mentoringToMentoringResponse(mentoringService.applyMentoring(profileId, mentorId, mentoringPostDto));
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 멘토링 신청 취소

    // 멘토링 수락

    // 멘토링 거절

    // 멘토링 전체 조회

    // 멘토링 상세 정보 조회

    // 멘토링 링크 생성
}
