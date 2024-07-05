package codi.backend.domain.recommendation.controller;

import codi.backend.auth.userdetails.CustomUserDetails;
import codi.backend.domain.recommendation.dto.JobRecommendationDto;
import codi.backend.domain.recommendation.service.JobRecommendationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Recommendation", description = "추천 API")
@RestController
@RequestMapping("/api/v1/rank")
@Validated
@Slf4j
public class JobRecommendationController {
    private final JobRecommendationService jobRecommendationService;

    public JobRecommendationController(JobRecommendationService jobRecommendationService) {
        this.jobRecommendationService = jobRecommendationService;
    }

    @Operation(summary = "직무 추천", description = "회원의 장애구분, 중증도, 연령을 고려해서 고용노동부의 '장애인 취업률 데이터'를 기반으로 많이 종사하는 직무 3개를 순차적으로 추천해준다.")
    @GetMapping
    public ResponseEntity getJobRecommendations(@AuthenticationPrincipal CustomUserDetails principal) {
        JobRecommendationDto.Response jobRecommendation = jobRecommendationService.recommendJobs(principal.getUsername());
        return new ResponseEntity<>(jobRecommendation, HttpStatus.OK);
    }
}
