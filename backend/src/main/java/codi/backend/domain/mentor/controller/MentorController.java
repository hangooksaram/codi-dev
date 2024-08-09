package codi.backend.domain.mentor.controller;

import codi.backend.auth.service.AuthService;
import codi.backend.auth.userdetails.CustomUserDetails;
import codi.backend.domain.mentor.dto.MentorDto;
import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.mentor.mapper.MentorMapper;
import codi.backend.domain.mentor.service.MentorService;
import codi.backend.global.response.MultiResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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

@Tag(name = "Mentor", description = "멘토 API")
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
    @Operation(summary = "멘토 등록", description = "직업 증명 파일(재직증명서, 경력기술서), 직무, 회사 이름, 멘토 소개를 작성해서 멘토가 될 수 있다. 생성 성공시 Access Token을 새로 발급하기 때문에 헤더에 있는 Authorization을 새로 저장해주어야 한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "멘토 프로필 생성 성공", content =
                    { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = MentorDto.MentorResponse.class))})
    })
    @PostMapping
    public ResponseEntity createMentor(@AuthenticationPrincipal CustomUserDetails principal,
                                       @Valid @RequestPart(value = "mentor") MentorDto.MentorPost mentorPostDto,
                                       @RequestPart(value = "file", required = false) MultipartFile file) {
        Mentor mentor = mentorService.becomeMentor(principal.getUsername(), mentorMapper.mentorPostDtoToMentor(mentorPostDto), file);
        MentorDto.MentorResponse response = mentorMapper.mentorToMentorResponse(mentor);

        String newAccessToken = authService.reissueAccessTokenByEmail(principal.getUsername());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + newAccessToken);

        return new ResponseEntity<>(response, headers, HttpStatus.CREATED);
    }

    // 멘토 정보 수정
    @Operation(summary = "멘토 정보 수정", description = "직업 증명 파일(재직증명서, 경력기술서), 직무, 회사, 소개를 선택해서 수정할 수 있다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "멘토 프로필 수정", content =
                    { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = MentorDto.MentorResponse.class))})
    })
    @PatchMapping
    public ResponseEntity updateMentor(@AuthenticationPrincipal CustomUserDetails principal,
                                       @Valid @RequestPart(value = "mentor") MentorDto.MentorPatch mentorPatchDto,
                                       @RequestPart(value = "file", required = false) MultipartFile file) {
        Mentor mentor = mentorService.updateMentorInformation(principal.getMentorId(), mentorMapper.mentorPatchDtoToMentor(mentorPatchDto), file);
        MentorDto.MentorResponse response = mentorMapper.mentorToMentorResponse(mentor);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 멘토 등록시 멘토 정보 조회
    @Operation(summary = "Mentor 프로필 조회", description = "Mentor를 신청하면서 입력한 정보를 조회할 수 있다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "자기 자신의 멘토 프로필 조회", content =
                    { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = MentorDto.MentorResponse.class))})
    })
    @GetMapping
    public ResponseEntity getMyMentorDetails(@AuthenticationPrincipal CustomUserDetails principal) {
        MentorDto.MentorResponse mentor = mentorMapper.mentorToMentorResponse(mentorService.findMentor(principal.getMentorId()));
        mentor.setMentoringCount(mentorService.getNumberOfCompletedMentorings(principal.getMentorId()));
        mentor.setResponseRate(mentorService.calculateResponseRate(principal.getMentorId()));
        mentor.setFutureScheduleCount(mentorService.getNumberOfSchedules(principal.getMentorId()));
        return new ResponseEntity<>(mentor, HttpStatus.OK);
    }

    // TODO 다른 멘토의 정보 보는 API - Response에서 표시할 정보 수정하기
    @Operation(summary = "타 Mentor 프로필 조회", description = "타 Mentor의 정보를 조회할 수 있다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "타 멘토 프로필 조회", content =
                    { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = MentorDto.MentorResponse.class))})
    })
    @GetMapping("/{mentor-id}")
    public ResponseEntity getMentorDetails(@PathVariable("mentor-id") Long mentorId) {
        MentorDto.MentorResponse mentor = mentorMapper.mentorToMentorResponse(mentorService.findMentor(mentorId));
        mentor.setMentoringCount(mentorService.getNumberOfCompletedMentorings(mentorId));
        mentor.setResponseRate(mentorService.calculateResponseRate(mentorId));
        mentor.setFutureScheduleCount(mentorService.getNumberOfSchedules(mentorId));
        return new ResponseEntity<>(mentor, HttpStatus.OK);
    }

    // TODO 추후 RequestParam을 Dto에 넣어서 넘기는 방법 사용
    @Operation(summary = "Mentor 필터링", description = "Mentor 정보를 필터링한 결과를 표시한다. \n" +
            "페이지 당 표시할 contents의 개수, example = \"20\"\n" +
            "확인하고 싶은 결과 페이지 번호 (0..N), example = \"0\"\n" +
            "오름차순 및 내림차순 정렬 (asc or desc), example = \"desc\"" +
            "page 기본값 = 1, size 기본값 = 12")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "멘토 검색 및 조회", content =
                    { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = MultiResponseDto.class),
                            examples = @ExampleObject(name = "멘토 검색 및 조회 example",
                                    value = "{\n" +
                                            "    \"data\": [\n" +
                                            "        {\n" +
                                            "            \"mentorId\": 0,\n" +
                                            "            \"nickname\": \"별명\",\n" +
                                            "            \"imgUrl\": \"프로필 이미지\",\n" +
                                            "            \"career\": \"경력\",\n" +
                                            "            \"job\": \"직무\",\n" +
                                            "            \"disability\": \"장애 유형\",\n" +
                                            "            \"severity\": \"중증도\",\n" +
                                            "            \"star\": 0.0,\n" +
                                            "            \"mentees\": 0\n" +
                                            "        }\n" +
                                            "    ],\n" +
                                            "    \"pageInfo\": {\n" +
                                            "        \"page\": 0,\n" +
                                            "        \"size\": 0,\n" +
                                            "        \"totalElements\": 0,\n" +
                                            "        \"totalPages\": 0\n" +
                                            "    }\n" +
                                            "}"
                    ))})
    })
    @GetMapping("/search")
    public ResponseEntity searchMentors(
            MentorDto.SearchMentorRequest searchMentorRequest,
            @RequestParam(name = "size", required = false, defaultValue = "12") int size,
            @RequestParam(name = "page", required = false, defaultValue = "1") int page) {
        Pageable pageable = PageRequest.of(page, size);
        Page<MentorDto.MentorProfileResponse> mentorsPage = mentorService.searchMentors(searchMentorRequest, pageable);
        List<MentorDto.MentorProfileResponse> mentorsList = mentorsPage.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(mentorsList, mentorsPage), HttpStatus.OK);
    }

    // 멘토 추천
    @Operation(summary = "Mentor 추천", description = "직무 추천 데이터를 Request에 입력하여 유사한 직무, 장애구분, 중증도를 기준으로 동작한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "멘토 추천", content =
                    { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = MentorDto.MentorProfileResponse.class))})
    })
    @GetMapping("/recommend")
    public ResponseEntity recommendMentors(MentorDto.RecommendationMentorRequest recommendationMentorRequest) {
        List<MentorDto.MentorProfileResponse> responses = mentorService.recommendMentors(recommendationMentorRequest);
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }
}
