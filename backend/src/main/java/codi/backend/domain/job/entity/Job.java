package codi.backend.domain.job.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Job {
    // TODO 추후 직무 데이터를 Job 객체로 변환해주어야 한다.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "job_category_id")
    private JobCategory jobCategory;
}
