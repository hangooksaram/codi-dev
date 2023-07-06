package codi.backend.domain.member.service;

import codi.backend.domain.member.dto.MemberDto;
import codi.backend.domain.member.dto.MentorDto;
import codi.backend.domain.member.entity.Member;
import codi.backend.domain.member.entity.Mentor;
import codi.backend.domain.member.entity.Profile;
import codi.backend.domain.member.repository.JpaMemberRepository;
import codi.backend.domain.member.repository.JpaMentorRepository;
import codi.backend.domain.member.repository.JpaProfileRepository;
import codi.backend.domain.member.utils.CustomAuthorityUtils;
import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.exception.ExceptionCode;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
public class MemberServiceImpl implements MemberService{
    private final JpaMemberRepository memberRepository;
    private final JpaProfileRepository profileRepository;
    private final JpaMentorRepository mentorRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberServiceImpl(JpaMemberRepository memberRepository, JpaProfileRepository profileRepository, JpaMentorRepository mentorRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.profileRepository = profileRepository;
        this.mentorRepository = mentorRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Member createMember(Member member) {
        // 비밀번호 암호화
        member.setPassword(passwordEncoder.encode(member.getPassword()));

        // Role 설정
        member.setRoles(CustomAuthorityUtils.createRoles(member));

        return memberRepository.save(member);
    }

    @Override
    public Mentor becomeMentor(String memberId, Mentor mentor) {
        Member member = findMember(memberId);
        mentor.setMember(member);

        // member에 mentor 1:1 연결
        member.setMentor(mentor);

        // 멘토 권한 추가(반드시 위에서 mentor 객체를 연결한 다음 실행되어야 한다.)
        member.setRoles(CustomAuthorityUtils.createRoles(member));

        // mentor DB 저장
        return mentorRepository.save(mentor);
    }

    @Override
    public Profile createProfile(String memberId, Profile profile) {
        Member member = findMember(memberId);
        profile.setMember(member);

        // member에 profile 1:1 연결
        member.setProfile(profile);

        // profile DB 저장
        return profileRepository.save(profile);
    }

    @Override
    public Member findMember(String memberId) {
        return verifyMember(memberId);
    }

    private Member verifyMember(String memberId) {
        return memberRepository.findById(memberId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    @Override
    public void updateMemberInformation(String memberId, String oldPassword, String newPassword) {
        Member member = findMember(memberId);

        if (!passwordEncoder.matches(oldPassword, member.getPassword())) {
            throw new BusinessLogicException(ExceptionCode.INVALID_OLD_PASSWORD);
        } else if (oldPassword.equals(newPassword)) {
            throw new BusinessLogicException(ExceptionCode.SAME_PASSWORD_ERROR);
        }

        member.setPassword(passwordEncoder.encode(newPassword));
        memberRepository.save(member);
    }

    @Override
    public Mentor updateMentorInformation(String memberId, Mentor mentor) {
        Member member = findMember(memberId);
        Mentor findMentor = member.getMentor();

        if (!member.getRoles().contains("MENTOR")) {
            throw new BusinessLogicException(ExceptionCode.NOT_MENTOR_ERROR);
        }

        Optional.ofNullable(mentor.getFileUrl())
                .ifPresent(findMentor::setFileUrl);
        Optional.ofNullable(mentor.getJob())
                .ifPresent(findMentor::setJob);
        Optional.ofNullable(mentor.getCompany())
                .ifPresent(findMentor::setCompany);
        Optional.ofNullable(mentor.getIntroduction())
                .ifPresent(findMentor::setIntroduction);

        return mentorRepository.save(findMentor);
    }

    @Override
    public Profile updateProfileInformation(String memberId, Profile profile) {
        Member member = findMember(memberId);
        Profile findProfile = member.getProfile();

        if (member.getProfile() == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_PROFILE_ERROR);
        }

        Optional.ofNullable(profile.getImgUrl())
                .ifPresent(findProfile::setImgUrl);
        Optional.ofNullable(profile.getJob())
                .ifPresent(findProfile::setJob);
        Optional.ofNullable(profile.getCareer())
                .ifPresent(findProfile::setCareer);
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
