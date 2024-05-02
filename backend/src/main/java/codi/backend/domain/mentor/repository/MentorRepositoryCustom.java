package codi.backend.domain.mentor.repository;

import codi.backend.domain.mentor.dto.MentorDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MentorRepositoryCustom {
    Page<MentorDto.SearchMentorResponse> search(String job, String career, String disability, String keyword, Pageable pageable);
    List<MentorDto.IntermediateMentorResponse> getMentorsByRanking(MentorDto.RecommendationMentorRequest request);
}
