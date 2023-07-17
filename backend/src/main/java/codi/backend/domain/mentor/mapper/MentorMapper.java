package codi.backend.domain.mentor.mapper;

import codi.backend.domain.mentor.dto.MentorDto;
import codi.backend.domain.mentor.entity.Mentor;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MentorMapper {
    // Mentor
    default Mentor mentorPostDtoToMentor(MentorDto.MentorPost mentorPostDto) {
        if (mentorPostDto == null) {
            return null;
        }

        return Mentor.builder()
                .fileUrl(mentorPostDto.getFileUrl())
                .job(mentorPostDto.getJob())
                .career(mentorPostDto.getCareer())
                .company(mentorPostDto.getCompany())
                .introduction(mentorPostDto.getIntroduction())
                .build();
    }

    default Mentor mentorPatchDtoToMentor(MentorDto.MentorPatch mentorPatchDto) {
        if (mentorPatchDto == null) {
            return null;
        }

        return Mentor.builder()
                .fileUrl(mentorPatchDto.getFileUrl())
                .job(mentorPatchDto.getJob())
                .career(mentorPatchDto.getCareer())
                .company(mentorPatchDto.getCompany())
                .introduction(mentorPatchDto.getIntroduction())
                .build();
    }

    default MentorDto.MentorResponse mentorToMentorResponse(Mentor mentor) {
        if (mentor == null) {
            return null;
        }

        return MentorDto.MentorResponse.builder()
                .id(mentor.getId())
                .fileUrl(mentor.getFileUrl())
                .job(mentor.getJob())
                .career(mentor.getCareer())
                .company(mentor.getCompany())
                .introduction(mentor.getIntroduction())
                .build();
    }

    List<MentorDto.MentorResponse> mentorsToMentorResponses(List<Mentor> mentors);
}
