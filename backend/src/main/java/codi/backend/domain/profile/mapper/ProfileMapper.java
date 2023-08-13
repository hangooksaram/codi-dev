package codi.backend.domain.profile.mapper;

import codi.backend.domain.favorite.dto.FavoriteResponseDto;
import codi.backend.domain.member.entity.Member;
import codi.backend.domain.profile.dto.ProfileDto;
import codi.backend.domain.profile.entity.Profile;
import org.mapstruct.Mapper;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
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
                .employmentStatus(Profile.EmploymentStatus.employmentStatusOf(profilePostDto.getEmploymentStatus()))
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
                .employmentStatus(Profile.EmploymentStatus.employmentStatusOf(profilePatchDto.getEmploymentStatus()))
                .build();
    }

    default ProfileDto.ProfileResponse profileToProfileResponse(Profile profile) {
        if (profile == null) {
            return null;
        }

        // TODO 추후 날짜 관련 Util 만들어서 처리
        // 이름, 나이
        String name = profile.getMember().getName();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        LocalDate birthDate = LocalDate.parse(profile.getMember().getBirth(), formatter);
        Integer age = Period.between(birthDate, LocalDate.now()).getYears();

        Set<FavoriteResponseDto> favorites = profile.getFavorites().stream()
                .map(FavoriteResponseDto::of)
                .collect(Collectors.toSet());

        return ProfileDto.ProfileResponse.builder()
                .id(profile.getId())
                .name(name)
                .age(age)
                .imgUrl(profile.getImgUrl())
                .job(profile.getJob())
                .desiredJob(profile.getDesiredJob())
                .education(profile.getEducation())
                .disability(profile.getDisability())
                .severity(profile.getSeverity())
                .introduction(profile.getIntroduction())
                .employmentStatus(profile.getEmploymentStatus().getEmploymentStatus())
                .favorites(favorites)
                .build();
    }
}
