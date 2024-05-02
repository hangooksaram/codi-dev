package codi.backend.domain.mentor.repository;

import codi.backend.domain.mentor.entity.Mentor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MentorRepository extends JpaRepository<Mentor, Long>, MentorRepositoryCustom {
}
