package codi.backend.domain.favorite.dto;

import codi.backend.domain.favorite.entity.Favorite;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


public class FavoriteDto {
    @Getter
    @Setter
    @NoArgsConstructor
    public static class FavoriteResponse {
        private Long id;
        private Long profileId;
        private Long mentorId;

        public static FavoriteResponse of(Favorite favorite) {
            FavoriteResponse dto = new FavoriteResponse();
            dto.setId(favorite.getId());
            dto.setMentorId(favorite.getMentor().getId());
            dto.setProfileId(favorite.getProfile().getId());
            return dto;
        }
    }

    @Getter
    @Builder
    public static class FavoriteListResponse {
        List<Long> favorites;
    }
}
