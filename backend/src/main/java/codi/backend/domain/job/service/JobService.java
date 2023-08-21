package codi.backend.domain.job.service;

import codi.backend.domain.job.dto.JobCategoryResponse;

import java.util.List;

public interface JobService {
    List<JobCategoryResponse> getAllJobsByCategory();
}
