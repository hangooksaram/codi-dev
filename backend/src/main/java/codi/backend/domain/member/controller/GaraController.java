package codi.backend.domain.member.controller;

import codi.backend.domain.member.dto.GaraDto;
import codi.backend.domain.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/signin")
@Validated
@Slf4j
public class GaraController {
    private final MemberService memberService;

    public GaraController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping
    public ResponseEntity signin(@RequestBody GaraDto.LoginDto loginDto) {
        GaraDto.LoginResponse response = memberService.loginMember(loginDto);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
