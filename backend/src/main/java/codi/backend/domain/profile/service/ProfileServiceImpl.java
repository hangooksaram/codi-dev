package codi.backend.domain.profile.service;

import codi.backend.domain.member.entity.Member;
import codi.backend.domain.member.repository.MemberRepository;
import codi.backend.domain.profile.entity.Profile;
import codi.backend.domain.profile.repository.ProfileRepository;
import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.exception.ExceptionCode;
import codi.backend.global.file.S3Service;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Transactional
@Service
public class ProfileServiceImpl implements ProfileService{
    private final ProfileRepository profileRepository;
    private final MemberRepository memberRepository;
    private final S3Service s3Service;

    public ProfileServiceImpl(ProfileRepository profileRepository, MemberRepository memberRepository, S3Service s3Service) {
        this.profileRepository = profileRepository;
        this.memberRepository = memberRepository;
        this.s3Service = s3Service;
    }

    @Override
    public Profile createProfile(String memberId, Profile profile, MultipartFile file) {
        Member member = findMember(memberId);
        profile.setMember(member);

        Optional.ofNullable(file)
                .filter(f -> !f.isEmpty())
                .map(f -> s3Service.upload(f, "profile"))
                .ifPresentOrElse(profile::setImgUrl, () -> profile.setImgUrl(null));

        // member에 profile 1:1 연결
        member.setProfile(profile);

        // profile DB 저장
        return profileRepository.save(profile);
    }

    @Override
    public Profile findProfile(String memberId) {
        return verifyProfile(memberId);
    }

    private Profile verifyProfile(String memberId) {
        Member member = findMember(memberId);
        if (member.getProfile() == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_PROFILE_ERROR);
        }
        return member.getProfile();
    }

    private Member findMember(String memberId) {
        return memberRepository.findById(memberId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    @Override
    public Profile updateProfileInformation(String memberId, Profile profile, MultipartFile file) {
        Profile findProfile = findProfile(memberId);

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

        Optional.ofNullable(inputProfile.getEducation())
                .ifPresent(findProfile::setEducation);
        Optional.ofNullable(inputProfile.getDisability())
                .ifPresent(findProfile::setDisability);
        Optional.ofNullable(inputProfile.getSeverity())
                .ifPresent(findProfile::setSeverity);
        Optional.ofNullable(inputProfile.getPeriod())
                .ifPresent(findProfile::setPeriod);
        Optional.ofNullable(inputProfile.getIntroduction())
                .ifPresent(findProfile::setIntroduction);
    }

    @Override
    public void deleteProfileImg(String memberId) {
        Profile findProfile = findProfile(memberId);
        try {
            s3Service.delete(findProfile.getImgUrl());
            findProfile.setImgUrl(null);
        } catch (NullPointerException e) {
            throw new BusinessLogicException(ExceptionCode.NOT_PROFILE_ERROR);
        }
    }
}
