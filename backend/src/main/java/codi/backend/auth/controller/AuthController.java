package codi.backend.auth.controller;

import codi.backend.auth.dto.AuthDto;
import codi.backend.auth.service.AuthService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Auth", description = "인증 API")
@RestController
@RequestMapping("/api/v1/auth")
@Validated
@Slf4j
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/logout")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "로그아웃")
    })
    public ResponseEntity logout(@RequestHeader(name = "Refresh") String refreshToken) {
        authService.logout(refreshToken);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/re-issue")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "AccessToken 재발급")
    })
    public ResponseEntity reissue(@RequestHeader(name = "Refresh") String refreshToken) {
        return ResponseEntity.ok()
                .header("Authorization", "Bearer " + authService.reissueAccessToken(refreshToken))
                .build();
    }

    @GetMapping("/check-access-token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "AccessToken 유효성 확인")
    })
    public ResponseEntity checkAccessToken(@RequestHeader(name = "Authorization") String accessToken) {
        AuthDto.CheckToken response = authService.checkAccessToken(accessToken);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/check-login-info")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "로그인 정보 조회")
    })
    public ResponseEntity checkLoginInfo(@RequestHeader(name = "Authorization") String accessToken) {
        AuthDto.CheckLoginInfo response = authService.checkLoginInfo(accessToken);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
