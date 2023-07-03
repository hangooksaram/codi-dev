package codi.backend.domain.member.repository;

import codi.backend.domain.member.entity.Mentor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaMentorRepository extends JpaRepository<Mentor, Long> {
}
