package codi.backend.domain.member.repository;

import codi.backend.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String>, MemberRepositoryCustom {
    boolean existsByEmail(String email);
    Optional<Member> findByEmail(String email);
    Optional<Member> findByIdAndEmail(String id, String email);

}
