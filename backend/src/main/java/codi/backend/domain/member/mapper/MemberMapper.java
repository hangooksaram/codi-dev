package codi.backend.domain.member.mapper;

import codi.backend.domain.member.dto.MemberDto;
import codi.backend.domain.member.dto.MentorDto;
import codi.backend.domain.member.dto.ProfileDto;
import codi.backend.domain.member.entity.Member;
import codi.backend.domain.member.entity.Mentor;
import codi.backend.domain.member.entity.Profile;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    default Member memberPostDtoToMember(MemberDto.MemberPost memberPostDto) {
        if (memberPostDto == null) {
            return null;
        }

        return Member.builder()
                .id(memberPostDto.getId())
                .name(memberPostDto.getName())
                .birth(memberPostDto.getBirth())
                .gender(memberPostDto.getGender())
                .email(memberPostDto.getEmail())
                .password(memberPostDto.getPassword())
                .build();
    }
    default MemberDto.MemberResponse memberToMemberResponse(Member member) {
        if (member == null) {
            return null;
        }

        return MemberDto.MemberResponse.builder()
                .id(member.getId())
                .name(member.getName())
                .birth(member.getBirth())
                .gender(member.getGender())
                .email(member.getEmail())
                .build();
    }

    default Profile profilePostDtoToProfile(ProfileDto.ProfilePost profilePostDto) {
        if (profilePostDto == null) {
            return null;
        }

        return Profile.builder()
                .imgUrl(profilePostDto.getImgUrl())
                .job(profilePostDto.getJob())
                .career(profilePostDto.getCareer())
                .education(profilePostDto.getEducation())
                .disability(profilePostDto.getDisability())
                .severity(profilePostDto.getSeverity())
                .period(profilePostDto.getPeriod())
                .introduction(profilePostDto.getIntroduction())

                .build();
    }

    default ProfileDto.ProfileResponse profileToProfileResponse(Profile profile) {
        if (profile == null) {
            return null;
        }

        return ProfileDto.ProfileResponse.builder()
                .id(profile.getId())
                .imgUrl(profile.getImgUrl())
                .job(profile.getJob())
                .career(profile.getCareer())
                .education(profile.getEducation())
                .disability(profile.getDisability())
                .severity(profile.getSeverity())
                .period(profile.getPeriod())
                .introduction(profile.getIntroduction())
                .build();
    }

    default Mentor mentorPostDtoToMentor(MentorDto.MentorPost mentorPostDto) {
        if (mentorPostDto == null) {
            return null;
        }

        return Mentor.builder()
                .fileUrl(mentorPostDto.getFileUrl())
                .job(mentorPostDto.getJob())
                .company(mentorPostDto.getCompany())
                .introduction(mentorPostDto.getIntroduction())
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
                .company(mentor.getCompany())
                .introduction(mentor.getIntroduction())
                .build();
    }
}
