package codi.backend.domain.profile.mapper;

import codi.backend.domain.favorite.dto.FavoriteResponseDto;
import codi.backend.domain.profile.dto.ProfileDto;
import codi.backend.domain.profile.entity.Profile;
import org.mapstruct.Mapper;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ProfileMapper {
    default Profile profilePostDtoToProfile(ProfileDto.ProfilePost profilePostDto) {
        if (profilePostDto == null) {
            return null;
        }

        return Profile.builder()
                .job(profilePostDto.getJob())
                .desiredJob(profilePostDto.getDesiredJob())
                .education(profilePostDto.getEducation())
                .disability(profilePostDto.getDisability())
                .severity(profilePostDto.getSeverity())
                .introduction(profilePostDto.getIntroduction())
                .employmentStatus(profilePostDto.getEmploymentStatus())
                .build();
    }

    default Profile profilePatchDtoToProfile(ProfileDto.ProfilePatch profilePatchDto) {
        if (profilePatchDto == null) {
            return null;
        }

        return Profile.builder()
                .job(profilePatchDto.getJob())
                .desiredJob(profilePatchDto.getDesiredJob())
                .education(profilePatchDto.getEducation())
                .disability(profilePatchDto.getDisability())
                .severity(profilePatchDto.getSeverity())
                .introduction(profilePatchDto.getIntroduction())
                .employmentStatus(profilePatchDto.getEmploymentStatus())
                .build();
    }

    default ProfileDto.ProfileResponse profileToProfileResponse(Profile profile) {
        if (profile == null) {
            return null;
        }

        Set<FavoriteResponseDto> favorites = profile.getFavorites().stream()
                .map(FavoriteResponseDto::of)
                .collect(Collectors.toSet());

        return ProfileDto.ProfileResponse.builder()
                .id(profile.getId())
                .imgUrl(profile.getImgUrl())
                .job(profile.getJob())
                .desiredJob(profile.getDesiredJob())
                .education(profile.getEducation())
                .disability(profile.getDisability())
                .severity(profile.getSeverity())
                .introduction(profile.getIntroduction())
                .employmentStatus(profile.getEmploymentStatus())
                .favorites(favorites)
                .build();
    }
}
