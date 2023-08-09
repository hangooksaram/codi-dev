package codi.backend.domain.mentoring.controller;

import codi.backend.domain.mentoring.mapper.MentoringMapper;
import codi.backend.domain.mentoring.service.MenteeMentoringService;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = { "Mentor's Mentoring" })
@RestController
@RequestMapping("/api/v1/mentors/mentoring")
@Validated
@Slf4j
public class MentorMentoringController {
    private final MenteeMentoringService mentoringService;
    private final MentoringMapper mentoringMapper;

    public MentorMentoringController(MenteeMentoringService mentoringService, MentoringMapper mentoringMapper) {
        this.mentoringService = mentoringService;
        this.mentoringMapper = mentoringMapper;
    }

    // 받은 신청 내역 전체 조회

    // 받은 멘토링 수락

    // 받은 멘토링 거절

    // 월별 멘토링 조회

    // 일별 멘토링 조회

    // 멘토링 링크 생성
}
