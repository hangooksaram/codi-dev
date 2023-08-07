package codi.backend.domain.mentor.mapper;

import codi.backend.domain.mentor.dto.MentorDto;
import codi.backend.domain.mentor.entity.Mentor;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface MentorMapper {
    // Mentor
    default Mentor mentorPostDtoToMentor(MentorDto.MentorPost mentorPostDto) {
        if (mentorPostDto == null) {
            return null;
        }

        return Mentor.builder()
                .company(mentorPostDto.getCompany())
                .job(mentorPostDto.getJob())
                .career(mentorPostDto.getCareer())
                .jobName(mentorPostDto.getJobName())
                .inOffice(mentorPostDto.getInOffice() != null ? mentorPostDto.getInOffice() : false)
                .introduction(mentorPostDto.getIntroduction())
                .mentoringCategories(mentorPostDto.getMentoringCategories() != null ? mentorPostDto.getMentoringCategories() : new ArrayList<>(4))
                .isCertificate(false)
                .star(0.0)
                .mentees(0)
                .build();
    }

    default Mentor mentorPatchDtoToMentor(MentorDto.MentorPatch mentorPatchDto) {
        if (mentorPatchDto == null) {
            return null;
        }

        return Mentor.builder()
                .company(mentorPatchDto.getCompany())
                .job(mentorPatchDto.getJob())
                .career(mentorPatchDto.getCareer())
                .jobName(mentorPatchDto.getJobName())
                .inOffice(mentorPatchDto.getInOffice())
                .introduction(mentorPatchDto.getIntroduction())
                .mentoringCategories(mentorPatchDto.getMentoringCategories())
                .build();
    }

    default MentorDto.MentorResponse mentorToMentorResponse(Mentor mentor) {
        if (mentor == null) {
            return null;
        }

        return MentorDto.MentorResponse.builder()
                .id(mentor.getId())
                .fileUrl(mentor.getFileUrl())
                .isCertificate(mentor.getIsCertificate())
                .company(mentor.getCompany())
                .job(mentor.getJob())
                .career(mentor.getCareer())
                .jobName(mentor.getJobName())
                .inOffice(mentor.getInOffice())
                .introduction(mentor.getIntroduction())
                .star(mentor.getStar())
                .mentees(mentor.getMentees())
                .mentoringCategories(mentor.getMentoringCategories())
                .build();
    }

    List<MentorDto.MentorResponse> mentorsToMentorResponses(List<Mentor> mentors);
}
