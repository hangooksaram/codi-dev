package codi.backend.domain.job.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class JobCategoryDto {
    private String classification;
    private List<JobDto> jobs;

    public JobCategoryDto(String classification, List<JobDto> jobs) {
        this.classification = classification;
        this.jobs = jobs;
    }
}
