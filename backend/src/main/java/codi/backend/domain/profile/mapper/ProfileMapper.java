package codi.backend.domain.profile.mapper;

import codi.backend.domain.profile.dto.ProfileDto;
import codi.backend.domain.profile.entity.Profile;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProfileMapper {
    // Profile
    default Profile profilePostDtoToProfile(ProfileDto.ProfilePost profilePostDto) {
        if (profilePostDto == null) {
            return null;
        }

        return Profile.builder()
                .desiredJob(profilePostDto.getDesiredJob())
                .education(profilePostDto.getEducation())
                .disability(profilePostDto.getDisability())
                .severity(profilePostDto.getSeverity())
                .introduction(profilePostDto.getIntroduction())
                .build();
    }

    default Profile profilePatchDtoToProfile(ProfileDto.ProfilePatch profilePatchDto) {
        if (profilePatchDto == null) {
            return null;
        }

        return Profile.builder()
                .desiredJob(profilePatchDto.getDesiredJob())
                .education(profilePatchDto.getEducation())
                .disability(profilePatchDto.getDisability())
                .severity(profilePatchDto.getSeverity())
                .introduction(profilePatchDto.getIntroduction())
                .build();
    }

    default ProfileDto.ProfileResponse profileToProfileResponse(Profile profile) {
        if (profile == null) {
            return null;
        }

        return ProfileDto.ProfileResponse.builder()
                .id(profile.getId())
                .imgUrl(profile.getImgUrl())
                .desiredJob(profile.getDesiredJob())
                .education(profile.getEducation())
                .disability(profile.getDisability())
                .severity(profile.getSeverity())
                .introduction(profile.getIntroduction())
                .build();
    }
}
