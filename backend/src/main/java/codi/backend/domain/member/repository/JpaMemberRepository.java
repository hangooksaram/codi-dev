package codi.backend.domain.member.repository;

import codi.backend.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaMemberRepository extends JpaRepository<Member, String>, MemberRepository {
}
