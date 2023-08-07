package codi.backend.domain.mentoring.repository;

import codi.backend.domain.mentoring.entity.Mentoring;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MentoringRepository extends JpaRepository<Mentoring, Long> {

}
