package codi.backend.domain.job.repository;

import codi.backend.domain.job.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long>, QuerydslPredicateExecutor<Job> {
    // job의 별칭을 j로 하고, j의 직업 카테고리 -> 분류 데이터를 '생산직', '사무직', '연구기술직', '서비스직', '기타' 순서로 커스텀한다.
    @Query("SELECT j FROM Job j JOIN FETCH j.jobCategory ORDER BY FIELD(j.jobCategory.classification, '생산직', '사무직', '연구기술직', '서비스직', '기타')")
    List<Job> findAllOrdered();
}
