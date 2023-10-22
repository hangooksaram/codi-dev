package codi.backend.auth.service;

import codi.backend.auth.entity.RefreshToken;
import codi.backend.auth.jwt.JwtTokenizer;
import codi.backend.auth.repository.RefreshTokenRepository;
import codi.backend.domain.member.entity.Member;
import codi.backend.domain.member.repository.MemberRepository;
import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.exception.ExceptionCode;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;

    public AuthServiceImpl(RefreshTokenRepository refreshTokenRepository, JwtTokenizer jwtTokenizer, MemberRepository memberRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.jwtTokenizer = jwtTokenizer;
        this.memberRepository = memberRepository;
    }

    @Override
    public void login(RefreshToken refresh) {
        refreshTokenRepository.save(refresh);
    }

    @Override
    public void logout(String refreshToken) {
        refreshTokenRepository.delete(findRefreshToken(refreshToken));
    }

    private RefreshToken findRefreshToken(String refreshToken) {
        return refreshTokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.REFRESH_TOKEN_NOT_FOUND));
    }

    @Override
    public String reissueAccessToken(String refreshToken) {
        // 토큰이 DB에 있는지 확인
        RefreshToken refresh = findRefreshToken(refreshToken);

        // 토큰의 유효기간이 유효한지 확인
        if (isRefreshTokenExpired(refresh)) {
            throw new BusinessLogicException(ExceptionCode.REFRESH_TOKEN_EXPIRED);
        }

        // 새로운 Acces Token 발급
        Member member = memberRepository.findById(refresh.getMemberId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        // 중복 코드 추후 수정 필요
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", member.getId());
        claims.put("roles", member.getRoles());

        String subject = member.getId();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private boolean isRefreshTokenExpired(RefreshToken refresh) {
        return refresh.getExpiryDate().before(new Date());
    }
}
