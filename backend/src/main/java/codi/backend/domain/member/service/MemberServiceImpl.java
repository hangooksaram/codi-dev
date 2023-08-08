package codi.backend.domain.member.service;

import codi.backend.domain.member.dto.GaraDto;
import codi.backend.domain.member.entity.Member;
import codi.backend.domain.member.repository.MemberRepository;
import codi.backend.domain.member.utils.CustomAuthorityUtils;
import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.exception.ExceptionCode;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MemberServiceImpl implements MemberService{
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberServiceImpl(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Member createMember(Member member) {
        // 중복 검사
        validateDuplicateId(member.getId());
        validateDuplicateEmail(member.getEmail());

        // 비밀번호 암호화
        member.setPassword(passwordEncoder.encode(member.getPassword()));

        // Role 설정
        member.setRoles(CustomAuthorityUtils.createRoles(member));

        return memberRepository.save(member);
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
    public GaraDto.LoginResponse loginMember(GaraDto.LoginDto loginDto) {
        Member findMember = findMember(loginDto.getId());
        isValidPassword(findMember, loginDto.getPassword());

        return GaraDto.LoginResponse.builder()
                .id(findMember.getId())
                .profileId(findMember.getProfile() != null ? findMember.getProfile().getId() : null)
                .mentorId(findMember.getMentor() != null ? findMember.getMentor().getId() : null)
                .imgUrl(findMember.getProfile() != null && findMember.getProfile().getImgUrl() != null ? findMember.getProfile().getImgUrl() : null)
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
