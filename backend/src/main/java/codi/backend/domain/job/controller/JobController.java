package codi.backend.domain.job.controller;

import codi.backend.domain.job.dto.JobCategoryResponse;
import codi.backend.domain.job.service.JobService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Job", description = "직무 조회 API")
@RestController
@RequestMapping("/api/v1/job-categories")
public class JobController {
    private final JobService jobCategoryService;

    public JobController(JobService jobCategoryService) {
        this.jobCategoryService = jobCategoryService;
    }

    @Operation(summary = "모든 직업 카테고리 조회", description = "분류 - 직업대분류로 이루어진 데이터를 조회한다. 회원가입시 직무 데이터를 표시할 때 사용할 용도이다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "모든 카테고리별 직무 조회", content =
                    { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = JobCategoryResponse.class))})
    })
    @GetMapping
    public ResponseEntity getAllJobCategories() {
        List<JobCategoryResponse> jobCategories = jobCategoryService.getAllJobsByCategory();
        return new ResponseEntity<>(jobCategories, HttpStatus.OK);
    }
}