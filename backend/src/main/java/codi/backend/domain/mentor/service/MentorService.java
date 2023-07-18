package codi.backend.domain.mentor.service;

import codi.backend.domain.mentor.dto.MentorDto;
import codi.backend.domain.mentor.entity.Mentor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface MentorService {
    // Mentor
    Mentor becomeMentor(String memberId, Mentor mentor, MultipartFile file);
    Mentor updateMentorInformation(String memberId, Mentor mentor, MultipartFile file);
    Mentor findMentor(String memberId);
    Page<MentorDto.SearchMentorResponse> getFilteredMentors(String job, String career, String disability, String keyword, Pageable pageable);
}
