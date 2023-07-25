package codi.backend.domain.favorite.service;

import codi.backend.domain.favorite.entity.Favorite;

public interface FavoriteService {
    void addFavorite(Long profileId, Long mentorId);
    void removeFavorite(Long profileId, Long mentorId);
}
