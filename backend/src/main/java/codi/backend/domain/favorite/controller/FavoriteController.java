package codi.backend.domain.favorite.controller;

import codi.backend.auth.userdetails.CustomUserDetails;
import codi.backend.domain.favorite.dto.FavoriteDto;
import codi.backend.domain.favorite.service.FavoriteService;
import codi.backend.domain.mentor.dto.MentorDto;
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

import java.util.List;

@Tag(name = "Favorite", description = "관심 멘토 API")
@RestController
@RequestMapping("/api/v1/profiles/favorites")
@Validated
@Slf4j
public class FavoriteController {
    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @Operation(summary = "관심 멘토 등록", description = "mentor의 id를 pathvariable에 입력하여 관심 멘토로 등록한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "관심 있는 멘토를 등록한다.")
    })
    @PostMapping("/{mentor-id}")
    public ResponseEntity addFavorite(@AuthenticationPrincipal CustomUserDetails principal,
                                      @PathVariable("mentor-id") Long mentorId) {
        favoriteService.addFavorite(principal.getProfileId(), mentorId);
        return ResponseEntity.ok().body("Add Favorite Mentor!");
    }

    @Operation(summary = "관심 멘토 삭제", description = "mentor의 id를 pathvariable에 입력하여 기존 설정한 관심 멘토를 삭제한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "관심 멘토를 목록에서 삭제한다.")
    })
    @DeleteMapping("/{mentor-id}")
    public ResponseEntity removeFavorite(@AuthenticationPrincipal CustomUserDetails principal,
                                         @PathVariable("mentor-id") Long mentorId) {
        favoriteService.removeFavorite(principal.getProfileId(), mentorId);
        return ResponseEntity.ok().body("Delete Favorite Mentor!");
    }

    // TODO 추후 세부사항 논의해서 기능 생성하기
    @Operation(summary = "관심 멘토 목록 id 조회", description = "관심 멘토에 저장된 멘토의 id 목록만을 불러온다.")
    @GetMapping("/mentor-ids")
    public ResponseEntity getFavorites(@AuthenticationPrincipal CustomUserDetails principal) {
        FavoriteDto.FavoriteListResponse favorites = favoriteService.findFavorites(principal.getProfileId());
        return new ResponseEntity<>(favorites, HttpStatus.OK);
    }

    @Operation(summary = "관심 멘토 목록 조회", description = "관심 멘토에 저장된 멘토의 정보를 불러온다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "관심 멘토 목록을 불러온다.", content =
                    { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = MentorDto.MentorProfileResponse.class))})
    })
    @GetMapping
    public ResponseEntity getFavoriteMentors(@AuthenticationPrincipal CustomUserDetails principal) {
        List<MentorDto.MentorProfileResponse> favorites = favoriteService.getFavoriteMentors(principal.getProfileId());
        return new ResponseEntity<>(favorites, HttpStatus.OK);
    }
}
