package codi.backend.domain.member.controller;

import codi.backend.domain.member.dto.MemberDto;
import codi.backend.domain.member.dto.MentorDto;
import codi.backend.domain.member.dto.ProfileDto;
import codi.backend.domain.member.mapper.MemberMapper;
import codi.backend.domain.member.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = { "회원 정보" })
@RestController
@RequestMapping("/members")
@Slf4j
public class MemberController {
    private final MemberService memberService;
//    private final MemberMapper memberMapper;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
//        this.memberMapper = memberMapper;
    }

    // 기본 회원가입
    @ApiOperation(value = "기본 회원가입", notes = "회원 아이디, 이름, 생년월일, 성별, 이메일을 입력해서 가입하고 회원 아이디와 이메일은 중복을 허용하지 않는다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "회원가입 성공")
    })
    @PostMapping("/signup")
    public ResponseEntity<MemberDto.MemberResponse> postMember(@RequestBody MemberDto.MemberPost memberPostDto) {
        return new ResponseEntity<>(MemberDto.MemberResponse, HttpStatus.CREATED);
    }

    // 멘토 등록
    @ApiOperation(value = "멘토 등록", notes = "재직증명서, 직무, 회사 이름, 멘토 소개를 작성해서 멘토가 될 수 있다.")
    @PostMapping("/mentor")
    public ResponseEntity<MentorDto.MentorResponse> postMentor(@RequestBody MentorDto.MentorPost mentorPostDto) {
        return new ResponseEntity<>(MentorDto.MentorResponse, HttpStatus.CREATED);
    }

    // 프로필 등록
    @ApiOperation(value = "프로필 등록", notes = "프로필 이미지, 직무, 경력, 학력, 장애 구분, 중증도, 장애 기간을 입력해서 프로필을 작성한다.")
    @PostMapping("/profile")
    public ResponseEntity<ProfileDto.ProfileResponse> postProfile(@RequestBody ProfileDto.ProfilePost profilePostDto) {
        return new ResponseEntity<>(ProfileDto.ProfileResponse, HttpStatus.OK);
    }
}
