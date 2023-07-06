package codi.backend.domain.member.service;

import codi.backend.domain.member.entity.Member;
import codi.backend.domain.member.repository.JpaMemberRepository;
import codi.backend.global.email.EmailService;
import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.exception.ExceptionCode;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AccountServiceImpl implements AccountService{
    private final JpaMemberRepository memberRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    public AccountServiceImpl(JpaMemberRepository memberRepository, EmailService emailService, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public boolean checkIdDuplication(String id) {
        return memberRepository.existsById(id);
    }

    @Override
    public boolean checkEmailDuplication(String email) {
        return memberRepository.existsByEmail(email);
    }

    @Override
    public void findId(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        String maskedId = maskId(member.getId());
        String subject = "[Codi] 요청하신 ID 입니다.";
        String message = "ID: " + maskedId;

        emailService.sendSimpleMessage(email, subject, message);
    }

    private String maskId(String id) {
        int length = id.length();
        String mask = "*".repeat(3);
        return id.substring(0, length - 3) + mask;
    }

    @Override
    public void findPw(String id, String email) {
        Member member = memberRepository.findByIdAndEmail(id, email)
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
