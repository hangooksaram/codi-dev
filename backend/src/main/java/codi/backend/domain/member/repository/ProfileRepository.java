package codi.backend.domain.member.repository;

import codi.backend.domain.member.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
}
