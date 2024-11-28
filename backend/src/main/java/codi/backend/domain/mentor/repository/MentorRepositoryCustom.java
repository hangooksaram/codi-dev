package codi.backend.domain.mentor.repository;

import codi.backend.domain.mentor.dto.MentorDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MentorRepositoryCustom {
    Page<MentorDto.MentorProfileResponse> search(MentorDto.SearchMentorRequest searchMentorRequest, Pageable pageable);
    List<MentorDto.MentorProfileResponse> getMentorsByRanking(MentorDto.RecommendationMentorRequest request);
    List<MentorDto.MentorProfileResponse> getTop4Mentors();
}
