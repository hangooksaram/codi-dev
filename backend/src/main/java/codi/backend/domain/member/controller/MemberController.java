package codi.backend.domain.member.controller;

import codi.backend.domain.member.dto.MemberDto;
import codi.backend.domain.member.dto.MentorDto;
import codi.backend.domain.member.dto.ProfileDto;
import codi.backend.domain.member.entity.Member;
import codi.backend.domain.member.entity.Mentor;
import codi.backend.domain.member.entity.Profile;
import codi.backend.domain.member.mapper.MemberMapper;
import codi.backend.domain.member.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    // 멘토 등록
    // TODO 추후 로그인 한 사용자의 로그인 정보를 함께 받는 방식으로 변경이 필요
    @ApiOperation(value = "멘토 등록", notes = "재직증명서, 직무, 회사 이름, 멘토 소개를 작성해서 멘토가 될 수 있다.")
    @PostMapping("/{member-id}/mentor")
    public ResponseEntity createMentor(@PathVariable("member-id") String memberId, @Valid @RequestBody MentorDto.MentorPost mentorPostDto) {
        Mentor mentor = memberService.becomeMentor(memberId, memberMapper.mentorPostDtoToMentor(mentorPostDto));
        MentorDto.MentorResponse response = memberMapper.mentorToMentorResponse(mentor);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 프로필 등록
    // TODO 추후 로그인 한 사용자의 로그인 정보를 함께 받는 방식으로 변경이 필요
    @ApiOperation(value = "프로필 등록", notes = "프로필 이미지, 직무, 경력, 학력, 장애 구분, 중증도, 장애 기간을 입력해서 프로필을 작성한다.")
    @PostMapping("/{member-id}/profile")
    public ResponseEntity createProfile(@PathVariable("member-id") String memberId, @Valid @RequestBody ProfileDto.ProfilePost profilePostDto) {
        Profile profile = memberService.createProfile(memberId, memberMapper.profilePostDtoToProfile(profilePostDto));
        ProfileDto.ProfileResponse response = memberMapper.profileToProfileResponse(profile);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 비밀번호 변경
    // TODO 추후 로그인 한 사용자의 로그인 정보를 함께 받는 방식으로 변경이 필요
    @ApiOperation(value = "회원정보 수정(비밀번호 변경)", notes = "현재 비밀번호와 새 비밀번호를 입력해서 비밀번호를 수정한다. 현재는 변경할 정보가 비밀번호 밖에 없기 때문에 해당 방식으로 구현했다.")
    @PatchMapping("/{member-id}")
    public ResponseEntity updateMember(@PathVariable("member-id") String memberId, @Valid @RequestBody MemberDto.MemberPatch memberPatchDto) {
        memberService.updateMemberInformation(memberId, memberPatchDto.getOldPassword(), memberPatchDto.getNewPassword());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 멘토 정보 수정
    // TODO 추후 로그인 한 사용자의 로그인 정보를 함께 받는 방식으로 변경이 필요
    @ApiOperation(value = "멘토 정보 수정", notes = "직업 증명 파일, 직무, 회사, 소개를 선택해서 수정할 수 있다.")
    @PatchMapping("/{member-id}/mentor")
    public ResponseEntity updateMentor(@PathVariable("member-id") String memberId, @Valid @RequestBody MentorDto.MentorPatch mentorPatchDto) {
        Mentor mentor = memberService.updateMentorInformation(memberId, memberMapper.mentorPatchDtoToMentor(mentorPatchDto));
        MentorDto.MentorResponse response = memberMapper.mentorToMentorResponse(mentor);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 프로필 정보 수정
    // TODO 추후 로그인 한 사용자의 로그인 정보를 함께 받는 방식으로 변경이 필요
    @ApiOperation(value = "프로필 정보 수정", notes = "프로필 이미지, 직무, 연차, 학력, 장애구분, 중증도, 장애기간, 소개를 선택해서 수정할 수 있다.")
    @PatchMapping("/{member-id}/profile")
    public ResponseEntity updateProfile(@PathVariable("member-id") String memberId, @Valid @RequestBody ProfileDto.ProfilePatch profilePatchDto) {
        Profile profile = memberService.updateProfileInformation(memberId, memberMapper.profilePatchDtoToProfile(profilePatchDto));
        ProfileDto.ProfileResponse response = memberMapper.profileToProfileResponse(profile);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
