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
    Page<MentorDto.MentorProfileResponse> searchMentors(MentorDto.SearchMentorRequest searchMentorRequest, Pageable pageable);
    List<MentorDto.MentorProfileResponse> recommendMentors(MentorDto.RecommendationMentorRequest request);
    Integer getNumberOfCompletedMentorings(Long mentorId);
    Double calculateResponseRate(Long mentorId);
    Integer getNumberOfSchedules(Long mentorId);
}
