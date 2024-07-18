package codi.backend.domain.member.controller;

import codi.backend.domain.member.dto.AccountDto;
import codi.backend.domain.member.service.AccountService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Tag(name = "Account", description = "계정 확인 API")
@RestController
@RequestMapping("/api/v1/account")
@Validated
@Slf4j
public class AccountController {
    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    // 이메일 중복 확인
    @Operation(summary = "이메일 중복 확인", description = "가입 시 이메일이 중복인지 확인한다. true: 중복, false: 중복 X")
    @GetMapping("/validate-email")
    public ResponseEntity duplicateEmail(@RequestParam String email) {
        boolean isDuplicated = accountService.checkEmailDuplication(email);
        return new ResponseEntity<>(isDuplicated, HttpStatus.OK);
    }

    // ID 찾기
    @Operation(summary = "계정 찾기", description = "email 주소를 입력하면 입력한 email 주소로 ID의 끝 세자리를 제외한 ID를 전송한다.")
    @PostMapping("/find-id")
    public ResponseEntity findId(@Valid @RequestBody AccountDto accountDto) {
        accountService.findId(accountDto.getEmail());
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    // PW 찾기
    @Operation(summary = "PW 찾기", description = "id와 email 주소를 입력하면 입력한 email로 임시 PW를 전송한다.")
    @PostMapping("/find-pw")
    public ResponseEntity findPw(@Valid @RequestBody AccountDto accountDto) {
        accountService.findPw(accountDto.getEmail());
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    // 이메일 인증
}
