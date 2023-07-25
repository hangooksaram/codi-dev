package codi.backend.domain.favorite.controller;

import codi.backend.domain.favorite.service.FavoriteService;
import io.swagger.annotations.Api;
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

    @PostMapping("/{mentorId}")
    public ResponseEntity addFavorite(@PathVariable Long profileId, @PathVariable Long mentorId) {
        favoriteService.addFavorite(profileId, mentorId);
        return ResponseEntity.ok().body("Add Favorite Mentor!");
    }

    @DeleteMapping("/{mentorId}")
    public ResponseEntity removeFavorite(@PathVariable Long profileId, @PathVariable Long mentorId) {
        favoriteService.removeFavorite(profileId, mentorId);
        return ResponseEntity.ok().body("Delete Favorite Mentor!");
    }
}
