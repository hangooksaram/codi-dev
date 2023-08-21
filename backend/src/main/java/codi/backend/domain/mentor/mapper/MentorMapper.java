package codi.backend.domain.mentor.mapper;

import codi.backend.domain.mentor.dto.MentorDto;
import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.profile.entity.Profile;
import org.mapstruct.Mapper;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
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
                .mentoringCategories(mentorPostDto.getMentoringCategories())
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

        // 이름, 나이
        String name = mentor.getMember().getName();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        LocalDate birthDate = LocalDate.parse(mentor.getMember().getBirth(), formatter);
        Integer age = Period.between(birthDate, LocalDate.now()).getYears();

        // 이미지, 학력
        String imgUrl = mentor.getMember().getProfile().getImgUrl();
        String disability = mentor.getMember().getProfile().getDisability();
        String severity = mentor.getMember().getProfile().getSeverity();
        String education = mentor.getMember().getProfile().getEducation();

        return MentorDto.MentorResponse.builder()
                .id(mentor.getId())
                .name(name)
                .age(age)
                .imgUrl(imgUrl)
                .disability(disability)
                .severity(severity)
                .fileUrl(mentor.getFileUrl())
                .isCertificate(mentor.getIsCertificate())
                .education(education)
                .company(mentor.getCompany())
                .job(mentor.getJob())
                .career(mentor.getCareer())
                .jobName(mentor.getJobName())
                .inOffice(mentor.getInOffice())
                .introduction(mentor.getIntroduction())
                .star(mentor.getStar())
                .mentees(mentor.getMentees())
                .mentoringCategories(Mentor.MentoringCategory.mentoringCategoryToString(mentor.getMentoringCategories()))
                .build();
    }

    List<MentorDto.MentorResponse> mentorsToMentorResponses(List<Mentor> mentors);
}
