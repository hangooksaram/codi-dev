package codi.backend.domain.member.service;

import codi.backend.auth.utils.CustomAuthorityUtils;
import codi.backend.domain.member.dto.MemberDto;
import codi.backend.domain.member.entity.Member;
import codi.backend.domain.member.repository.MemberRepository;
import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.exception.ExceptionCode;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        validateDuplicateEmail(member.getEmail());

        // 비밀번호 암호화
        member.setPassword(passwordEncoder.encode(member.getPassword()));

        // Role 설정
        member.setRoles(authorityUtils.createRoles(member));

        return memberRepository.save(member);
    }

    private void validateDuplicateEmail(String email) {
        if (memberRepository.existsByEmail(email)) {
            throw new BusinessLogicException(ExceptionCode.DUPLICATE_EMAIL);
        }
    }

    @Transactional(readOnly = true)
    @Override
    public Member findMember(String email) {
        return verifyMember(email);
    }

    private Member verifyMember(String email) {
        return memberRepository.findByEmail(email).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    @Transactional
    @Override
    public void updateMemberInformation(String email, MemberDto.MemberPatch memberPatchDto) {
        Member member = findMember(email);

        isValidOldPassword(member, memberPatchDto.getOldPassword());
        isSamePassword(memberPatchDto.getOldPassword(), memberPatchDto.getNewPassword());

        member.setPassword(passwordEncoder.encode(memberPatchDto.getNewPassword()));
        memberRepository.save(member);
    }

    private void isValidOldPassword(Member member, String oldPassword) {
        if (!passwordEncoder.matches(oldPassword, member.getPassword())) {
            throw new BusinessLogicException(ExceptionCode.INVALID_OLD_PASSWORD);
        }
    }

    private void isSamePassword(String oldPassword, String newPassword) {
        if (oldPassword.equals(newPassword)) {
            throw new BusinessLogicException(ExceptionCode.SAME_PASSWORD_ERROR);
        }
    }
}
