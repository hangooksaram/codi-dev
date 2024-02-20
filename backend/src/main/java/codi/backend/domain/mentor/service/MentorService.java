package codi.backend.domain.mentor.service;

import codi.backend.domain.mentor.dto.MentorDto;
import codi.backend.domain.mentor.entity.Mentor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MentorService {
    // Mentor
    Mentor becomeMentor(String memberId, Mentor mentor, MultipartFile file);
    Mentor updateMentorInformation(Long mentorId, Mentor mentor, MultipartFile file);
    Mentor findMentor(Long mentorId);
    Page<MentorDto.SearchMentorResponse> searchMentors(String job, String career, String disability, String keyword, Pageable pageable);
    List<MentorDto.SearchMentorResponse> recommendMentors(MentorDto.RecommendationMentorRequest request);
    Integer getNumberOfCompletedMentorings(Long mentorId);
    Double calculateResponseRate(Long mentorId);
}
