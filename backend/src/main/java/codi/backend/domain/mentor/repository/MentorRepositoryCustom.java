package codi.backend.domain.mentor.repository;

import codi.backend.domain.mentor.dto.MentorDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MentorRepositoryCustom {
    Page<MentorDto.SearchMentorResponse> search(String job, Integer career, String disability, String keyword, Pageable pageable);
}
