package codi.backend.domain.member.repository;

import codi.backend.domain.member.dto.MentorDto;
import codi.backend.domain.member.entity.Mentor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MentorRepositoryCustom {
    Page<MentorDto.SearchMentorResponse> search(String job, Integer career, String disability, String keyword, Pageable pageable);
}
