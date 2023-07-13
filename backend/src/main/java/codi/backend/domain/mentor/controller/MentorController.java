package codi.backend.domain.mentor.controller;

import codi.backend.domain.mentor.dto.MentorDto;
import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.mentor.mapper.MentorMapper;
import codi.backend.domain.mentor.service.MentorService;
import codi.backend.global.response.MultiResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Api(tags = { "Mentor" })
@RestController
@RequestMapping("/api/v1/mentors")
@Validated
@Slf4j
public class MentorController {
    private final MentorService mentorService;
    private final MentorMapper mentorMapper;

    public MentorController(MentorService mentorService, MentorMapper mentorMapper) {
        this.mentorService = mentorService;
        this.mentorMapper = mentorMapper;
    }

    // 멘토 등록
    // TODO 추후 로그인 한 사용자의 로그인 정보를 함께 받는 방식으로 변경이 필요
    @ApiOperation(value = "멘토 등록", notes = "재직증명서, 직무, 회사 이름, 멘토 소개를 작성해서 멘토가 될 수 있다.")
    @PostMapping("/{member-id}")
    public ResponseEntity createMentor(@PathVariable("member-id") String memberId, @Valid @RequestBody MentorDto.MentorPost mentorPostDto) {
        Mentor mentor = mentorService.becomeMentor(memberId, mentorMapper.mentorPostDtoToMentor(mentorPostDto));
        MentorDto.MentorResponse response = mentorMapper.mentorToMentorResponse(mentor);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 멘토 정보 수정
    // TODO 추후 로그인 한 사용자의 로그인 정보를 함께 받는 방식으로 변경이 필요
    @ApiOperation(value = "멘토 정보 수정", notes = "직업 증명 파일, 직무, 회사, 소개를 선택해서 수정할 수 있다.")
    @PatchMapping("/{member-id}")
    public ResponseEntity updateMentor(@PathVariable("member-id") String memberId, @Valid @RequestBody MentorDto.MentorPatch mentorPatchDto) {
        Mentor mentor = mentorService.updateMentorInformation(memberId, mentorMapper.mentorPatchDtoToMentor(mentorPatchDto));
        MentorDto.MentorResponse response = mentorMapper.mentorToMentorResponse(mentor);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 멘토 등록시 멘토 정보 조회
    // TODO 추후 로그인 한 사용자의 로그인 정보를 함께 받는 방식으로 변경이 필요
    @ApiOperation(value = "Mentor 개인 페이지 조회", notes = "Mentor를 신청하면서 입력한 정보를 조회할 수 있다.")
    @GetMapping("/{member-id}")
    public ResponseEntity getMentor(@PathVariable("member-id") String memberId) {
        MentorDto.MentorResponse mentor = mentorMapper.mentorToMentorResponse(mentorService.findMentor(memberId));
        return new ResponseEntity<>(mentor, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getFilteredMentors(
            @RequestParam(name = "job", required = false) String job,
            @RequestParam(name = "career", required = false) Integer career,
            @RequestParam(name = "disability", required = false) String disability,
            @RequestParam(name = "keyword", required = false) String keyword,
            @PageableDefault Pageable pageable) {
        Page<MentorDto.SearchMentorResponse> mentorsPage = mentorService.getFilteredMentors(job, career, disability, keyword, pageable);
        List<MentorDto.SearchMentorResponse> mentorsList = mentorsPage.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mentorsList, mentorsPage), HttpStatus.OK
        );
    }
}
