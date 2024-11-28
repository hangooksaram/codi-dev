package codi.backend.domain.member.controller;

import codi.backend.auth.userdetails.CustomUserDetails;
import codi.backend.domain.member.dto.MemberDto;
import codi.backend.domain.member.entity.Member;
import codi.backend.domain.member.mapper.MemberMapper;
import codi.backend.domain.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Tag(name = "Member", description = "회원 API")
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
    @Operation(summary = "기본 회원가입", description = "이메일, 비밀번호를 입력해서 가입하고 이메일은 중복을 허용하지 않는다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "회원가입 성공", content =
                    { @Content(mediaType = "application/json")})
    })
    @PostMapping("/signup")
    public ResponseEntity signup(@Valid @RequestBody MemberDto.MemberPost memberPostDto) {
        Member member = memberService.createMember(memberMapper.memberPostDtoToMember(memberPostDto));
        MemberDto.MemberResponse memberResponse = memberMapper.memberToMemberResponse(member);
        return new ResponseEntity<>(memberResponse, HttpStatus.CREATED);
    }

    // 비밀번호 변경
    @Operation(summary = "회원정보 수정(비밀번호 변경)", description = "현재 비밀번호와 새 비밀번호를 입력해서 비밀번호를 수정한다. 현재는 변경할 정보가 비밀번호 밖에 없기 때문에 해당 방식으로 구현했다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원정보 수정 완료" , content =
                    { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = MemberDto.MemberResponse.class)) })
    })
    @PatchMapping
    public ResponseEntity updateMember(@AuthenticationPrincipal CustomUserDetails principal,
                                       @Valid @RequestBody MemberDto.MemberPatch memberPatchDto) {
        memberService.updateMemberInformation(principal.getUsername(), memberPatchDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 마이페이지 조회
    @Operation(summary = "마이페이지 조회", description = "회원가입 시 입력한 정보를 조회할 수 있다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "마이페이지 조회" , content =
                    { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = MemberDto.MemberResponse.class)) })
    })
    @GetMapping
    public ResponseEntity getMember(@AuthenticationPrincipal CustomUserDetails principal) {
        MemberDto.MemberResponse member = memberMapper.memberToMemberResponse(memberService.findMember(principal.getUsername()));
        return new ResponseEntity<>(member, HttpStatus.OK);
    }
}
