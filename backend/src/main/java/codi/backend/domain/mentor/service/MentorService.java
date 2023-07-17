package codi.backend.domain.mentor.service;

import codi.backend.domain.mentor.dto.MentorDto;
import codi.backend.domain.mentor.entity.Mentor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MentorService {
    // Mentor
    Mentor becomeMentor(String memberId, Mentor mentor);
    Mentor updateMentorInformation(String memberId, Mentor mentor);
    Mentor findMentor(String memberId);
    Page<MentorDto.SearchMentorResponse> getFilteredMentors(String job, Integer career, String disability, String keyword, Pageable pageable);
}
