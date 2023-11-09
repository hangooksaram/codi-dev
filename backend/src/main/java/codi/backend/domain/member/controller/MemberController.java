package codi.backend.domain.member.controller;

import codi.backend.auth.userdetails.CustomUserDetails;
import codi.backend.domain.member.dto.MemberDto;
import codi.backend.domain.member.entity.Member;
import codi.backend.domain.member.mapper.MemberMapper;
import codi.backend.domain.member.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Api(tags = { "Member" })
@RestController
@RequestMapping("/api/v1/members")
@Validated
@Slf4j
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper memberMapper;

    public MemberController(MemberService memberService, MemberMapper memberMapper) {
        this.memberService = memberService;
        this.memberMapper = memberMapper;
    }

    // 기본 회원가입
    @ApiOperation(value = "기본 회원가입", notes = "회원 아이디, 이름, 생년월일, 성별, 이메일을 입력해서 가입하고 회원 아이디와 이메일은 중복을 허용하지 않는다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "회원가입 성공")
    })
    @PostMapping("/signup")
    public ResponseEntity signup(@Valid @RequestBody MemberDto.MemberPost memberPostDto) {
        Member member = memberService.createMember(memberMapper.memberPostDtoToMember(memberPostDto));
        MemberDto.MemberResponse response = memberMapper.memberToMemberResponse(member);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 비밀번호 변경
    @ApiOperation(value = "회원정보 수정(비밀번호 변경)", notes = "현재 비밀번호와 새 비밀번호를 입력해서 비밀번호를 수정한다. 현재는 변경할 정보가 비밀번호 밖에 없기 때문에 해당 방식으로 구현했다.")
    @PatchMapping
    public ResponseEntity updateMember(@AuthenticationPrincipal CustomUserDetails principal, @Valid @RequestBody MemberDto.MemberPatch memberPatchDto) {
        memberService.updateMemberInformation(principal.getUsername(), memberPatchDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 마이페이지 조회
    @ApiOperation(value = "마이페이지 조회", notes = "회원가입 시 입력한 정보를 조회할 수 있다.")
    @GetMapping
    public ResponseEntity getMember(@AuthenticationPrincipal CustomUserDetails principal) {
        MemberDto.MemberResponse member = memberMapper.memberToMemberResponse(memberService.findMember(principal.getUsername()));
        return new ResponseEntity<>(member, HttpStatus.OK);
    }
}
