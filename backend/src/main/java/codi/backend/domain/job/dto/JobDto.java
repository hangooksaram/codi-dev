package codi.backend.domain.job.dto;

import codi.backend.domain.job.entity.Job;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JobDto {
    private String name;

    public JobDto(Job job) {
        this.name = job.getName();
    }
}
