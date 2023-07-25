package codi.backend.domain.favorite.repository;

import codi.backend.domain.favorite.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    Optional<Favorite> findByProfileIdAndMentorId(Long profileId,Long mentorId);
}
