package codi.backend.domain.profile.service;

import codi.backend.domain.favorite.entity.Favorite;
import codi.backend.domain.member.entity.Member;
import codi.backend.domain.member.repository.MemberRepository;
import codi.backend.domain.member.service.MemberService;
import codi.backend.domain.member.service.MemberServiceImpl;
import codi.backend.domain.profile.entity.Profile;
import codi.backend.domain.profile.repository.ProfileRepository;
import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.exception.ExceptionCode;
import codi.backend.global.file.S3Service;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProfileServiceImpl implements ProfileService{
    private final ProfileRepository profileRepository;
    private final MemberService memberService;
    private final S3Service s3Service;

    public ProfileServiceImpl(ProfileRepository profileRepository, MemberService memberService, S3Service s3Service) {
        this.profileRepository = profileRepository;
        this.memberService = memberService;
        this.s3Service = s3Service;
    }

    @Transactional
    @Override
    public Profile createProfile(String memberId, Profile profile, MultipartFile file) {
        Member member = memberService.findMember(memberId);

        if (member.getProfile() != null) {
            throw new BusinessLogicException(ExceptionCode.PROFILE_EXIST);
        }

        Optional.ofNullable(file)
                .filter(f -> !f.isEmpty())
                .map(f -> s3Service.upload(f, "profile"))
                .ifPresentOrElse(profile::setImgUrl, () -> profile.setImgUrl(null));

        // member에 profile 1:1 연결
        member.setProfile(profile);
        profile.setMember(member);

        // profile DB 저장
        return profileRepository.save(profile);
    }

    @Override
    public Profile findProfile(Long profileId) {
        return verifyProfile(profileId);
    }

    private Profile verifyProfile(Long profileId) {
        return profileRepository.findById(profileId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PROFILE_NOT_FOUND));
    }

    @Transactional
    @Override
    public Profile updateProfileInformation(Long profileId, Profile profile, MultipartFile file) {
        Profile findProfile = findProfile(profileId);

        // Profile image 수정
        updateProfileImage(findProfile, file);

        // Profile field 수정
        if (profile != null) {
            updateProfileFields(profile, findProfile);
        }

        return profileRepository.save(findProfile);
    }

    private void updateProfileImage(Profile findProfile, MultipartFile file) {
        String previousImgUrl = findProfile.getImgUrl();

        try {
            if (file != null && !file.isEmpty()) {
                // 이미지를 업로드하고 기존 이미지가 있으면 삭제합니다.
                String newImgUrl = s3Service.upload(file, "profile");
                findProfile.setImgUrl(newImgUrl);

                if (previousImgUrl != null) {
                    s3Service.delete(previousImgUrl);
                }
            } else if (file != null && file.isEmpty() && previousImgUrl != null) {
                // 파일 파라미터가 비어 있고 기존 이미지가 있는 경우, 기존 이미지를 삭제합니다.
                s3Service.delete(previousImgUrl);
                findProfile.setImgUrl(null);
            }
        } catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.FILE_UPDATE_FAILED);
        }
    }

    private void updateProfileFields(Profile inputProfile, Profile findProfile) {
        if (inputProfile == null) {
            throw new BusinessLogicException(ExceptionCode.PROFILE_NOT_FOUND);
        }

        Optional.ofNullable(inputProfile.getJob())
                .ifPresent(findProfile::setJob);
        Optional.ofNullable(inputProfile.getDesiredJob())
                .ifPresent(findProfile::setDesiredJob);
        Optional.ofNullable(inputProfile.getEducation())
                .ifPresent(findProfile::setEducation);
        Optional.ofNullable(inputProfile.getDisability())
                .ifPresent(findProfile::setDisability);
        Optional.ofNullable(inputProfile.getSeverity())
                .ifPresent(findProfile::setSeverity);
        Optional.ofNullable(inputProfile.getIntroduction())
                .ifPresent(findProfile::setIntroduction);
        Optional.ofNullable(inputProfile.getEmploymentStatus())
                .ifPresent(findProfile::setEmploymentStatus);
    }

    @Transactional
    @Override
    public void deleteProfileImg(Long profileId) {
        Profile findProfile = findProfile(profileId);
        try {
            s3Service.delete(findProfile.getImgUrl());
            findProfile.setImgUrl(null);
        } catch (NullPointerException e) {
            throw new BusinessLogicException(ExceptionCode.NOT_PROFILE_ERROR);
        }
    }

    @Override
    public List<Long> getFavoriteMentorIds(Long profileId) {
        Profile profile = findProfile(profileId);
        Set<Favorite> favorites = profile.getFavorites();
        return favorites.stream()
                .map(f -> f.getMentor().getId())
                .collect(Collectors.toList());
    }
}
