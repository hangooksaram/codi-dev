package codi.backend.domain.favorite.service;

import codi.backend.domain.favorite.dto.FavoriteDto;
import codi.backend.domain.mentor.dto.MentorDto;

import java.util.List;

public interface FavoriteService {
    void addFavorite(Long profileId, Long mentorId);
    void removeFavorite(Long profileId, Long mentorId);
    FavoriteDto.FavoriteListResponse findFavorites(Long profileId);
    List<MentorDto.SearchMentorResponse> getFavoriteMentors(Long profileId);
}
