package codi.backend.domain.profile.controller;

import codi.backend.auth.service.AuthService;
import codi.backend.auth.userdetails.CustomUserDetails;
import codi.backend.domain.profile.dto.ProfileDto;
import codi.backend.domain.profile.entity.Profile;
import codi.backend.domain.profile.mapper.ProfileMapper;
import codi.backend.domain.profile.service.ProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@Tag(name = "Profile", description = "프로필 API")
@RestController
@RequestMapping("/api/v1/profiles")
@Validated
@Slf4j
public class ProfileController {
    private final ProfileService profileService;
    private final AuthService authService;
    private final ProfileMapper profileMapper;

    public ProfileController(ProfileService profileService, AuthService authService, ProfileMapper profileMapper) {
        this.profileService = profileService;
        this.authService = authService;
        this.profileMapper = profileMapper;
    }

    // 프로필 등록
    @Operation(summary = "프로필 등록", description = "프로필 이미지, 직무, 경력, 학력, 장애 구분, 중증도, 장애 기간을 입력해서 프로필을 작성한다. 생성 성공시 Access Token을 새로 발급하기 때문에 헤더에 있는 Authorization을 새로 저장해주어야 한다.")
    @PostMapping
    public ResponseEntity createProfile(@AuthenticationPrincipal CustomUserDetails principal,
                                        @Valid @RequestPart(value = "profile") ProfileDto.ProfilePost profilePostDto,
                                        @RequestPart(value = "file", required = false) MultipartFile file) {
        Profile profile = profileService.createProfile(principal.getUsername(), profileMapper.profilePostDtoToProfile(profilePostDto), file);
        ProfileDto.ProfileResponse response = profileMapper.profileToProfileResponse(profile);

        String newAccessToken = authService.reissueAccessTokenByMemberId(principal.getUsername());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + newAccessToken);

        return new ResponseEntity<>(response, headers, HttpStatus.CREATED);
    }

    // 프로필 정보 수정
    @Operation(summary = "프로필 정보 수정", description = "프로필 이미지, 직무, 연차, 학력, 장애구분, 중증도, 장애기간, 소개를 선택해서 수정할 수 있다.")
    @PatchMapping
    public ResponseEntity updateProfile(@AuthenticationPrincipal CustomUserDetails principal,
                                        @Valid @RequestPart(value = "profile", required = false) ProfileDto.ProfilePatch profilePatchDto,
                                        @RequestPart(value = "file", required = false) MultipartFile file) {
        Profile profile = profileService.updateProfileInformation(principal.getProfileId(), profileMapper.profilePatchDtoToProfile(profilePatchDto), file);
        ProfileDto.ProfileResponse response = profileMapper.profileToProfileResponse(profile);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "프로필 이미지 삭제", description = "memberId에 해당하는 사용자의 프로필 이미지를 삭제한다.")
    @DeleteMapping("/profile-image/{profile-id}")
    public ResponseEntity deleteProfileImg(@PathVariable("profile-id") Long profileId) {
        profileService.deleteProfileImg(profileId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 프로필 정보 조회
    @Operation(summary = "프로필 페이지 조회", description = "프로필 페이지에 입력한 정보를 조회할 수 있다.")
    @GetMapping(value = {"", "/{profile-id}"})
    public ResponseEntity getProfile(@AuthenticationPrincipal CustomUserDetails principal, @PathVariable(name = "profile-id", required = false) Long profileId) {
        Long curProfileId = (profileId != null) ? profileId : principal.getProfileId();
        ProfileDto.ProfileResponse profile = profileMapper.profileToProfileResponse(profileService.findProfile(curProfileId));
        return new ResponseEntity<>(profile, HttpStatus.OK);
    }
}
