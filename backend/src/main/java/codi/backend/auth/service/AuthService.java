package codi.backend.auth.service;

import codi.backend.auth.dto.AuthDto;
import codi.backend.auth.entity.RefreshToken;

public interface AuthService {
    void login(RefreshToken refreshToken);
    void logout(String refreshToken);
    String reissueAccessToken(String refreshToken);
    String reissueAccessTokenByMemberId(String memberId);
    AuthDto.CheckToken checkAccessToken(String accessToken);
    AuthDto.CheckLoginInfo checkLoginInfo(String accessToken);
}
