package codi.backend.domain.member.service;

import codi.backend.domain.member.dto.MentorDto;
import codi.backend.domain.member.entity.Mentor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MentorService {
    // Mentor
    Mentor updateMentorInformation(String memberId, Mentor mentor);
    Mentor becomeMentor(String memberId, Mentor mentor);
    Mentor findMentor(String memberId);
    Page<MentorDto.SearchMentorResponse> getFilteredMentors(String job, Integer career, String disability, String keyword, Pageable pageable);
    Page<Mentor> getMentors(Pageable pageable);
}
