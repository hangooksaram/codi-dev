package codi.backend.auth.service;

import codi.backend.auth.dto.AuthDto;
import codi.backend.auth.entity.RefreshToken;
import codi.backend.auth.jwt.JwtTokenizer;
import codi.backend.auth.repository.RefreshTokenRepository;
import codi.backend.domain.member.entity.Member;
import codi.backend.domain.member.repository.MemberRepository;
import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.exception.ExceptionCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class AuthServiceImpl implements AuthService {
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtTokenizer jwtTokenizer;
//    private final MemberService memberService;
    private final MemberRepository memberRepository;

    public AuthServiceImpl(RefreshTokenRepository refreshTokenRepository, JwtTokenizer jwtTokenizer, MemberRepository memberRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.jwtTokenizer = jwtTokenizer;
//        this.memberService = memberService;
        this.memberRepository = memberRepository;
    }

    @Override
    public void login(RefreshToken refresh) {
        log.info("---------------------refresh token info---------------------");
        log.info("id: {}", refresh.getMemberId());
        log.info("email: {}", refresh.getEmail());
        log.info("refreshtoken: {}", refresh.getRefreshToken());
        log.info("expiry date: {}", refresh.getExpiryDate());
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

        // 새로운 Access Token 발급
        String accessToken = generateAccessTokenFromRefreshToken(refresh);

        return accessToken;
    }

    private boolean isRefreshTokenExpired(RefreshToken refresh) {
        return refresh.getExpiryDate().before(new Date());
    }

    @Override
    public String reissueAccessTokenByEmail(String email) {
        // username으로 refresh token을 찾는다.
        RefreshToken refresh = refreshTokenRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.REFRESH_TOKEN_NOT_FOUND));

        // 토큰의 유효기간이 유효한지 확인
        if (isRefreshTokenExpired(refresh)) {
            throw new BusinessLogicException(ExceptionCode.REFRESH_TOKEN_EXPIRED);
        }

        // 새로운 Access Token 발급
        String accessToken = generateAccessTokenFromRefreshToken(refresh);

        return accessToken;
    }

    private String generateAccessTokenFromRefreshToken(RefreshToken refreshToken) {
//        Member member = memberService.findMember(refreshToken.getEmail());
        Member member = findMember(refreshToken.getEmail());

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", member.getId());
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());
        claims.put("profileId", member.getProfile() != null ? member.getProfile().getId() : null);
        claims.put("mentorId", member.getMentor() != null ? member.getMentor().getId() : null);

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private Member findMember(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    @Override
    public AuthDto.CheckToken checkAccessToken(String accessToken) {
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String jws = jwtTokenizer.removeBearer(accessToken);

        AuthDto.CheckToken checkToken = new AuthDto.CheckToken();
        checkToken.setIsLoggedIn(jwtTokenizer.isTokenValid(jws, base64EncodedSecretKey));

        return checkToken;
    }

    @Override
    public AuthDto.CheckLoginInfo checkLoginInfo(String accessToken) {
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String jws = jwtTokenizer.removeBearer(accessToken);

        // Access Token이 유효하지 않으면 클라이언트에서 다른 api 요청
        if (!jwtTokenizer.isTokenValid(jws, base64EncodedSecretKey)) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_TOKEN_EXPIRED);
        }

        // claim에서 memberId 추출
        Jws<Claims> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey);
//        Member member = memberService.findMember(claims.getBody().getSubject());
        Member member = findMember(claims.getBody().getSubject());

        // 통과 했으면 정상적으로 객체 생성하기
        AuthDto.CheckLoginInfo checkLoginInfo = new AuthDto.CheckLoginInfo();
        checkLoginInfo.setId(member.getId());
        checkLoginInfo.setEmail(member.getEmail());
        checkLoginInfo.setIsProfile(member.getProfile() != null);
        checkLoginInfo.setIsMentor(member.getMentor() != null);

        if (member.getProfile() != null) {
            checkLoginInfo.setProfileImageUrl(member.getProfile().getImgUrl());
        } else {
            checkLoginInfo.setProfileImageUrl(null);
        }

        return checkLoginInfo;
    }
}
