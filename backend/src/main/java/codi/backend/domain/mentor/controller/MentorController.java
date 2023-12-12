package codi.backend.domain.mentor.controller;

import codi.backend.auth.service.AuthService;
import codi.backend.auth.userdetails.CustomUserDetails;
import codi.backend.domain.mentor.dto.MentorDto;
import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.mentor.mapper.MentorMapper;
import codi.backend.domain.mentor.service.MentorService;
import codi.backend.domain.profile.service.ProfileService;
import codi.backend.global.response.MultiResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@Api(tags = { "Mentor" })
@RestController
@RequestMapping("/api/v1/mentors")
@Validated
@Slf4j
public class MentorController {
    private final MentorService mentorService;
    private final AuthService authService;
    private final MentorMapper mentorMapper;

    public MentorController(MentorService mentorService, AuthService authService, MentorMapper mentorMapper) {
        this.mentorService = mentorService;
        this.authService = authService;
        this.mentorMapper = mentorMapper;
    }

    // 멘토 등록
    @ApiOperation(value = "멘토 등록", notes = "직업 증명 파일(재직증명서, 경력기술서), 직무, 회사 이름, 멘토 소개를 작성해서 멘토가 될 수 있다. 생성 성공시 Access Token을 새로 발급하기 때문에 헤더에 있는 Authorization을 새로 저장해주어야 한다.")
    @PostMapping
    public ResponseEntity createMentor(@AuthenticationPrincipal CustomUserDetails principal,
                                       @Valid @RequestPart(value = "mentor") MentorDto.MentorPost mentorPostDto,
                                       @RequestPart(value = "file", required = false) MultipartFile file) {
        Mentor mentor = mentorService.becomeMentor(principal.getUsername(), mentorMapper.mentorPostDtoToMentor(mentorPostDto), file);
        MentorDto.MentorResponse response = mentorMapper.mentorToMentorResponse(mentor);

        String newAccessToken = authService.reissueAccessTokenByMemberId(principal.getUsername());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + newAccessToken);

        return new ResponseEntity<>(response, headers, HttpStatus.CREATED);
    }

    // 멘토 정보 수정
    @ApiOperation(value = "멘토 정보 수정", notes = "직업 증명 파일(재직증명서, 경력기술서), 직무, 회사, 소개를 선택해서 수정할 수 있다.")
    @PatchMapping
    public ResponseEntity updateMentor(@AuthenticationPrincipal CustomUserDetails principal,
                                       @Valid @RequestPart(value = "mentor") MentorDto.MentorPatch mentorPatchDto,
                                       @RequestPart(value = "file", required = false) MultipartFile file) {
        Mentor mentor = mentorService.updateMentorInformation(principal.getMentorId(), mentorMapper.mentorPatchDtoToMentor(mentorPatchDto), file);
        MentorDto.MentorResponse response = mentorMapper.mentorToMentorResponse(mentor);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 멘토 등록시 멘토 정보 조회
    @ApiOperation(value = "Mentor 개인 페이지 조회", notes = "Mentor를 신청하면서 입력한 정보를 조회할 수 있다.")
    @GetMapping
    public ResponseEntity getMyMentorDetails(@AuthenticationPrincipal CustomUserDetails principal) {
        MentorDto.MentorResponse mentor = mentorMapper.mentorToMentorResponse(mentorService.findMentor(principal.getMentorId()));
        return new ResponseEntity<>(mentor, HttpStatus.OK);
    }

    // TODO 다른 멘토의 정보 보는 API - Response에서 표시할 정보 수정하기
    @GetMapping("/{mentor-id}")
    public ResponseEntity getMentorDetails(@PathVariable("mentor-id") Long mentorId) {
        MentorDto.MentorResponse mentor = mentorMapper.mentorToMentorResponse(mentorService.findMentor(mentorId));
        return new ResponseEntity<>(mentor, HttpStatus.OK);
    }

    // TODO 추후 RequestParam을 Dto에 넣어서 넘기는 방법 사용
    @ApiOperation(value = "Mentor 필터링", notes = "Mentor 정보를 필터링한 결과를 표시한다. \n" +
            "페이지 당 표시할 contents의 개수, example = \"20\"\n" +
            "확인하고 싶은 결과 페이지 번호 (0..N), example = \"0\"\n" +
            "오름차순 및 내림차순 정렬 (asc or desc), example = \"desc\"" +
            "page 기본값 = 1, size 기본값 = 12")
    @GetMapping("/search")
    public ResponseEntity searchMentors(
            @RequestParam(name = "job", required = false) String job,
            @RequestParam(name = "career", required = false) String career,
            @RequestParam(name = "disability", required = false) String disability,
            @RequestParam(name = "keyword", required = false) String keyword,
            @RequestParam(name = "size", required = false, defaultValue = "12") int size,
            @RequestParam(name = "page", required = false, defaultValue = "1") int page) {
        Pageable pageable = PageRequest.of(page, size);
        Page<MentorDto.SearchMentorResponse> mentorsPage = mentorService.searchMentors(job, career, disability, keyword, pageable);
        List<MentorDto.SearchMentorResponse> mentorsList = mentorsPage.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(mentorsList, mentorsPage), HttpStatus.OK);
    }

    @ApiOperation(value = "Mentor 추천", notes = "직무 추천 데이터를 Request에 입력하여 유사한 직무, 장애구분, 중증도를 기준으로 동작한다.")
    @GetMapping("/recommend")
    public ResponseEntity recommendMentors(MentorDto.RecommendationMentorRequest recommendationMentorRequest) {
        List<MentorDto.SearchMentorResponse> responses = mentorService.recommendMentors(recommendationMentorRequest);
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }
}
