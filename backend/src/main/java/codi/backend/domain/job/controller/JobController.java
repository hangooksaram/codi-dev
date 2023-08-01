package codi.backend.domain.job.controller;

import codi.backend.domain.job.dto.JobCategoryDto;
import codi.backend.domain.job.service.JobService;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/job-categories")
public class JobController {
    private final JobService jobCategoryService;

    public JobController(JobService jobCategoryService) {
        this.jobCategoryService = jobCategoryService;
    }

    @ApiOperation(value = "모든 직업 카테고리 조회", notes = "분류 - 직업대분류로 이루어진 데이터를 조회한다. 회원가입시 직무 데이터를 표시할 때 사용할 용도이다.")
    @GetMapping
    public ResponseEntity getAllJobCategories() {
        List<JobCategoryDto> jobCategories = jobCategoryService.getAllJobsByCategory();
        return new ResponseEntity<>(jobCategories, HttpStatus.OK);
    }
}