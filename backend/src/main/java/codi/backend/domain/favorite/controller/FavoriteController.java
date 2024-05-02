package codi.backend.domain.favorite.controller;

import codi.backend.auth.userdetails.CustomUserDetails;
import codi.backend.domain.favorite.dto.FavoriteDto;
import codi.backend.domain.favorite.service.FavoriteService;
import codi.backend.domain.mentor.dto.MentorDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = { "Favorite" })
@RestController
@RequestMapping("/api/v1/profiles/favorites")
@Validated
@Slf4j
public class FavoriteController {
    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @ApiOperation(value = "관심 멘토 등록", notes = "mentor의 id를 pathvariable에 입력하여 관심 멘토로 등록한다.")
    @PostMapping("/{mentor-id}")
    public ResponseEntity addFavorite(@AuthenticationPrincipal CustomUserDetails principal, @PathVariable("mentor-id") Long mentorId) {
        favoriteService.addFavorite(principal.getProfileId(), mentorId);
        return ResponseEntity.ok().body("Add Favorite Mentor!");
    }

    @ApiOperation(value = "관심 멘토 삭제", notes = "mentor의 id를 pathvariable에 입력하여 기존 설정한 관심 멘토를 삭제한다.")
    @DeleteMapping("/{mentor-id}")
    public ResponseEntity removeFavorite(@AuthenticationPrincipal CustomUserDetails principal, @PathVariable("mentor-id") Long mentorId) {
        favoriteService.removeFavorite(principal.getProfileId(), mentorId);
        return ResponseEntity.ok().body("Delete Favorite Mentor!");
    }

    // TODO 추후 세부사항 논의해서 기능 생성하기
    @ApiOperation(value = "관심 멘토 목록 id 조회", notes = "관심 멘토에 저장된 멘토의 id 목록만을 불러온다.")
    @GetMapping("/mentor-ids")
    public ResponseEntity getFavorites(@AuthenticationPrincipal CustomUserDetails principal) {
        FavoriteDto.FavoriteListResponse favorites = favoriteService.findFavorites(principal.getProfileId());
        return new ResponseEntity<>(favorites, HttpStatus.OK);
    }

    @ApiOperation(value = "관심 멘토 목록 조회", notes = "관심 멘토에 저장된 멘토의 정보를 불러온다.")
    @GetMapping
    public ResponseEntity getFavoriteMentors(@AuthenticationPrincipal CustomUserDetails principal) {
        List<MentorDto.SearchMentorResponse> favorites = favoriteService.getFavoriteMentors(principal.getProfileId());
        return new ResponseEntity<>(favorites, HttpStatus.OK);
    }
}
