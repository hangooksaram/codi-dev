package codi.backend.domain.job.service;

import codi.backend.domain.job.dto.JobCategoryDto;
import codi.backend.domain.job.dto.JobDto;
import codi.backend.domain.job.entity.Job;
import codi.backend.domain.job.repository.JobRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Transactional
@Service
public class JobServiceImpl implements JobService {
    private final JobRepository jobRepository;

    public JobServiceImpl(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @Override
    public List<JobCategoryDto> getAllJobsByCategory() {
        // findAll()과 비교했을 때, 속도가 약 5배 정도 빠르다.
        List<Job> jobs = jobRepository.findAllOrdered();

        // classification을 기준으로 그룹화, LinkedHashMap을 사용해서 순서가 유지되도록 했다.
        Map<String, List<Job>> jobsByCategory = jobs.stream()
                .collect(Collectors.groupingBy(job -> job.getJobCategory().getClassification(), LinkedHashMap::new, Collectors.toList()));

        List<JobCategoryDto> result = new ArrayList<>();
        for(Map.Entry<String, List<Job>> entry : jobsByCategory.entrySet()) {
            String classification = entry.getKey();
            List<Job> jobsInCategory = entry.getValue();

            List<JobDto> jobDtos = jobsInCategory.stream()
                    .map(JobDto::new)
                    .collect(Collectors.toList());

            result.add(new JobCategoryDto(classification, jobDtos));
        }

        return result;
    }
}
