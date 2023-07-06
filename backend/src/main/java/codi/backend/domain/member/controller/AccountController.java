package codi.backend.domain.member.controller;

import codi.backend.domain.member.dto.AccountDto;
import codi.backend.domain.member.service.AccountService;
import codi.backend.domain.member.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Api(tags = { "Account" })
@RestController
@RequestMapping("/api/v1/account")
@Validated
@Slf4j
public class AccountController {
    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    // ID 중복 확인
    @ApiOperation(value = "ID 중복 확인", notes = "가입 시 ID가 중복인지 확인한다. true: 중복, false: 중복 X")
    @GetMapping("/validate-id")
    public ResponseEntity duplicateId(@RequestParam String id) {
        boolean isDuplicated = accountService.checkIdDuplication(id);
        return new ResponseEntity<>(isDuplicated, HttpStatus.OK);
    }

    // 이메일 중복 확인
    @ApiOperation(value = "이메일 중복 확인", notes = "가입 시 이메일이 중복인지 확인한다. true: 중복, false: 중복 X")
    @GetMapping("/validate-email")
    public ResponseEntity duplicateEmail(@RequestParam String email) {
        boolean isDuplicated = accountService.checkEmailDuplication(email);
        return new ResponseEntity<>(isDuplicated, HttpStatus.OK);
    }

    // ID 찾기
    @ApiOperation(value = "ID 찾기", notes = "email 주소를 입력하면 입력한 email 주소로 ID의 끝 세자리를 제외한 ID를 전송한다.")
    @PostMapping("/find-id")
    public ResponseEntity findId(@Valid @RequestBody AccountDto.FindIdDto findIdDto) {
        accountService.findId(findIdDto.getEmail());
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    // PW 찾기
    @ApiOperation(value = "PW 찾기", notes = "id와 email 주소를 입력하면 입력한 email로 임시 PW를 전송한다.")
    @PostMapping("/find-pw")
    public ResponseEntity findPw(@Valid @RequestBody AccountDto.FindPwDto findPwDto) {
        accountService.findPw(findPwDto.getId(), findPwDto.getEmail());
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    // 이메일 인증
}
