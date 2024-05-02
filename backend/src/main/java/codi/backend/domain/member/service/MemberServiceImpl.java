package codi.backend.domain.member.service;

import codi.backend.domain.member.dto.GaraDto;
import codi.backend.domain.member.dto.MemberDto;
import codi.backend.domain.member.entity.Member;
import codi.backend.domain.member.repository.MemberRepository;
import codi.backend.auth.utils.CustomAuthorityUtils;
import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.profile.entity.Profile;
import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.exception.ExceptionCode;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MemberServiceImpl implements MemberService{
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    public MemberServiceImpl(MemberRepository memberRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    @Transactional
    @Override
    public Member createMember(Member member) {
        // 중복 검사
        validateDuplicateId(member.getId());
        validateDuplicateEmail(member.getEmail());

        // 비밀번호 암호화
        member.setPassword(passwordEncoder.encode(member.getPassword()));

        // Role 설정
        member.setRoles(authorityUtils.createRoles(member));

        return memberRepository.save(member);
    }

    @Transactional(readOnly = true)
    @Override
    public Member findMember(String memberId) {
        return verifyMember(memberId);
    }

    private Member verifyMember(String memberId) {
        return memberRepository.findById(memberId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    @Transactional
    @Override
    public void updateMemberInformation(String memberId, MemberDto.MemberPatch memberPatchDto) {
        Member member = findMember(memberId);

        if (!passwordEncoder.matches(memberPatchDto.getOldPassword(), member.getPassword())) {
            throw new BusinessLogicException(ExceptionCode.INVALID_OLD_PASSWORD);
        } else if (memberPatchDto.getOldPassword().equals(memberPatchDto.getNewPassword())) {
            throw new BusinessLogicException(ExceptionCode.SAME_PASSWORD_ERROR);
        }

        member.setPassword(passwordEncoder.encode(memberPatchDto.getNewPassword()));
        memberRepository.save(member);
    }

    @Override
    public GaraDto.LoginResponse loginMember(GaraDto.LoginDto loginDto) {
        Member findMember = findMember(loginDto.getId());
        Profile profile = findMember.getProfile();
        Mentor mentor = findMember.getMentor();

        List<Long> favorites = profile != null ? profile.getFavorites()
                .stream()
                .map(f -> f.getMentor().getId())
                .collect(Collectors.toList()) : null;

        isValidPassword(findMember, loginDto.getPassword());

        return GaraDto.LoginResponse.builder()
                .id(findMember.getId())
                .profileId(profile != null ? profile.getId() : null)
                .mentorId(mentor != null ? mentor.getId() : null)
                .imgUrl(profile != null ? profile.getImgUrl() : null)
                .favorites(favorites)
                .build();
    }

    private void validateDuplicateId(String id) {
        if (memberRepository.existsById(id)) {
            throw new BusinessLogicException(ExceptionCode.DUPLICATED_ID);
        }
    }

    private void validateDuplicateEmail(String email) {
        if (memberRepository.existsByEmail(email)) {
            throw new BusinessLogicException(ExceptionCode.DUPLICATE_EMAIL);
        }
    }

    private void isValidPassword(Member member, String password) {
        if (!passwordEncoder.matches(password, member.getPassword())) {
            throw new BusinessLogicException(ExceptionCode.INVALID_PASSWORD);
        }
    }
}
