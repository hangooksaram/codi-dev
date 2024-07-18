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
                .career(mentorPostDto.getCareer())
                .job(mentorPostDto.getJob())
                .introduction(mentorPostDto.getIntroduction())
                .mentoringCategories(mentorPostDto.getMentoringCategories())
                .star(0.0)
                .mentees(0)
                .build();
    }

    default Mentor mentorPatchDtoToMentor(MentorDto.MentorPatch mentorPatchDto) {
        if (mentorPatchDto == null) {
            return null;
        }
        return Mentor.builder()
                .career(mentorPatchDto.getCareer())
                .job(mentorPatchDto.getJob())
                .introduction(mentorPatchDto.getIntroduction())
                .mentoringCategories(mentorPatchDto.getMentoringCategories())
                .build();
    }

    // TODO 추후 Service에서 처리할 수 있도록 변경 필요
    default MentorDto.MentorResponse mentorToMentorResponse(Mentor mentor) {
        if (mentor == null) {
            return null;
        }
        // 별명
        String nickname = mentor.getMember().getProfile().getNickname();
        String imgUrl = mentor.getMember().getProfile().getImgUrl();
        String disability = mentor.getMember().getProfile().getDisability();
        String severity = mentor.getMember().getProfile().getSeverity();

        return MentorDto.MentorResponse.builder()
                .id(mentor.getId())
                .nickname(nickname)
                .imgUrl(imgUrl)
                .disability(disability)
                .severity(severity)
                .career(mentor.getCareer())
                .job(mentor.getJob())
                .introduction(mentor.getIntroduction())
                .star(mentor.getStar())
                .mentees(mentor.getMentees())
                .mentoringCategories(Mentor.MentoringCategory.mentoringCategoryToString(mentor.getMentoringCategories()))
                .build();
    }

    List<MentorDto.MentorResponse> mentorsToMentorResponses(List<Mentor> mentors);
}
