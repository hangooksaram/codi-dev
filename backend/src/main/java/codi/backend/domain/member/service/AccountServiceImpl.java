package codi.backend.domain.member.service;

import codi.backend.domain.member.entity.Member;
import codi.backend.domain.member.repository.MemberRepository;
import codi.backend.global.email.EmailService;
import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.exception.ExceptionCode;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AccountServiceImpl implements AccountService{
    private final MemberRepository memberRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    public AccountServiceImpl(MemberRepository memberRepository, EmailService emailService, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public boolean checkEmailDuplication(String email) {
        return memberRepository.existsByEmail(email); // MemberService에서 DI 고려
    }

    @Transactional
    @Override
    public void findId(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        String subject = "[Codi] Codi ID 찾기";
        String message = "ID: " + member.getEmail() + "님, 비밀번호를 잊어버리셨다면 임시 비밀번호를 발급 받아보세요.";

        emailService.sendSimpleMessage(email, subject, message);
    }

    @Transactional
    @Override
    public void findPw(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        String temporaryPassword = generateTemporaryPassword();
        String subject = "[Codi] 임시 비밀번호 발급";
        String message = "임시 PW: " + temporaryPassword;

        emailService.sendSimpleMessage(email, subject, message);

        member.setPassword(passwordEncoder.encode(temporaryPassword));
        memberRepository.save(member);
    }

    private String generateTemporaryPassword() {
        return UUID.randomUUID().toString().substring(0, 8);
    }
}
