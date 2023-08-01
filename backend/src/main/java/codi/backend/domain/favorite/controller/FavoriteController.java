package codi.backend.domain.favorite.controller;

import codi.backend.domain.favorite.service.FavoriteService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Api(tags = { "Favorite" })
@RestController
@RequestMapping("/api/v1/profiles/{profileId}/favorites")
@Validated
@Slf4j
public class FavoriteController {
    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @ApiOperation(value = "관심 멘토 등록", notes = "mentor의 id를 pathvariable에 입력하여 관심 멘토로 등록한다.")
    @PostMapping("/{mentorId}")
    public ResponseEntity addFavorite(@PathVariable Long profileId, @PathVariable Long mentorId) {
        favoriteService.addFavorite(profileId, mentorId);
        return ResponseEntity.ok().body("Add Favorite Mentor!");
    }

    @ApiOperation(value = "관심 멘토 삭제", notes = "mentor의 id를 pathvariable에 입력하여 기존 설정한 관심 멘토를 삭제한다.")
    @DeleteMapping("/{mentorId}")
    public ResponseEntity removeFavorite(@PathVariable Long profileId, @PathVariable Long mentorId) {
        favoriteService.removeFavorite(profileId, mentorId);
        return ResponseEntity.ok().body("Delete Favorite Mentor!");
    }
}
