package codi.backend.domain.profile.service;

import codi.backend.domain.member.entity.Member;
import codi.backend.domain.profile.entity.Profile;
import codi.backend.domain.member.repository.MemberRepository;
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
                .map(f -> s3Service.upload(f, "profile"))
                .ifPresent(profile::setImgUrl);

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
    public Profile updateProfileInformation(String memberId, Profile profile) {
        Profile findProfile = findProfile(memberId);

        Optional.ofNullable(profile.getImgUrl())
                .ifPresent(findProfile::setImgUrl);
        Optional.ofNullable(profile.getEducation())
                .ifPresent(findProfile::setEducation);
        Optional.ofNullable(profile.getDisability())
                .ifPresent(findProfile::setDisability);
        Optional.ofNullable(profile.getSeverity())
                .ifPresent(findProfile::setSeverity);
        Optional.ofNullable(profile.getPeriod())
                .ifPresent(findProfile::setPeriod);
        Optional.ofNullable(profile.getIntroduction())
                .ifPresent(findProfile::setIntroduction);

        return profileRepository.save(findProfile);
    }
}
