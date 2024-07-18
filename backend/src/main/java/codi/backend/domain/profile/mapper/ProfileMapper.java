package codi.backend.domain.profile.mapper;

import codi.backend.domain.favorite.dto.FavoriteDto;
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
                .nickname(profilePostDto.getNickname())
                .desiredJob(profilePostDto.getDesiredJob())
                .disability(profilePostDto.getDisability())
                .severity(profilePostDto.getSeverity())
                .employmentStatus(profilePostDto.getEmploymentStatus())
                .build();
    }

    default Profile profilePatchDtoToProfile(ProfileDto.ProfilePatch profilePatchDto) {
        if (profilePatchDto == null) {
            return null;
        }
        return Profile.builder()
                .nickname(profilePatchDto.getNickname())
                .desiredJob(profilePatchDto.getDesiredJob())
                .disability(profilePatchDto.getDisability())
                .severity(profilePatchDto.getSeverity())
                .employmentStatus(profilePatchDto.getEmploymentStatus())
                .build();
    }

    default ProfileDto.ProfileResponse profileToProfileResponse(Profile profile) {
        if (profile == null) {
            return null;
        }
        Set<FavoriteDto.FavoriteResponse> favorites = profile.getFavorites().stream()
                .map(FavoriteDto.FavoriteResponse::of)
                .collect(Collectors.toSet());

        return ProfileDto.ProfileResponse.builder()
                .id(profile.getId())
                .nickname(profile.getNickname())
                .imgUrl(profile.getImgUrl())
                .desiredJob(profile.getDesiredJob())
                .disability(profile.getDisability())
                .severity(profile.getSeverity())
                .employmentStatus(profile.getEmploymentStatus().getEmploymentStatus())
                .favorites(favorites)
                .build();
    }
}
