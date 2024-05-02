package codi.backend.domain.job.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class JobCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String classification;

    @OneToMany(mappedBy = "jobCategory")
    private List<Job> jobs = new ArrayList<>();
}
