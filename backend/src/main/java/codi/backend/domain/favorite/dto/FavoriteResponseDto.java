package codi.backend.domain.favorite.dto;

import codi.backend.domain.favorite.entity.Favorite;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FavoriteResponseDto {
    private Long id;
    private Long profileId;
    private Long mentorId;

    public static FavoriteResponseDto of(Favorite favorite) {
        FavoriteResponseDto dto = new FavoriteResponseDto();
        dto.setId(favorite.getId());
        dto.setMentorId(favorite.getMentor().getId());
        dto.setProfileId(favorite.getProfile().getId());
        return dto;
    }
}
