package codi.backend.domain.job.service;

import codi.backend.domain.job.dto.JobCategoryDto;

import java.util.List;

public interface JobService {
    List<JobCategoryDto> getAllJobsByCategory();
}
