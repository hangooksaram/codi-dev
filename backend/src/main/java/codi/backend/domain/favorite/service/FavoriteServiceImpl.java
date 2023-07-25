package codi.backend.domain.favorite.service;

import codi.backend.domain.favorite.entity.Favorite;
import codi.backend.domain.favorite.repository.FavoriteRepository;
import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.mentor.repository.MentorRepository;
import codi.backend.domain.profile.entity.Profile;
import codi.backend.domain.profile.repository.ProfileRepository;
import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FavoriteServiceImpl implements FavoriteService{
    private final ProfileRepository profileRepository;
    private final MentorRepository mentorRepository;
    private final FavoriteRepository favoriteRepository;

    public FavoriteServiceImpl(ProfileRepository profileRepository, MentorRepository mentorRepository, FavoriteRepository favoriteRepository) {
        this.profileRepository = profileRepository;
        this.mentorRepository = mentorRepository;
        this.favoriteRepository = favoriteRepository;
    }

    @Transactional
    @Override
    public void addFavorite(Long profileId, Long mentorId) {
        Profile profile = getProfile(profileId);
        Mentor mentor = getMentor(mentorId);

        validateSelfFavorite(profile, mentor);
        validateAlreadyFavorite(profileId, mentorId);

        Favorite favorite = createFavorite(profile, mentor);

        profile.addFavorite(favorite);
        mentor.addFollower(favorite);
    }

    @Transactional
    @Override
    public void removeFavorite(Long profileId, Long mentorId) {
        Favorite favorite = findFavorite(profileId, mentorId);

        Profile profile = getProfile(profileId);
        Mentor mentor = getMentor(mentorId);

        validateSelfFavorite(profile, mentor);

        profile.removeFavorite(favorite);
        mentor.removeFollower(favorite);
    }

    private Favorite findFavorite(Long profileId, Long mentorId) {
        return favoriteRepository.findByProfileIdAndMentorId(profileId, mentorId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FAVORITE_NOT_FOUND));
    }

    private Profile getProfile(Long profileId) {
        return profileRepository.findById(profileId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PROFILE_NOT_FOUND));
    }

    private Mentor getMentor(Long mentorId) {
        return mentorRepository.findById(mentorId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_MENTOR_ERROR));
    }

    private void validateAlreadyFavorite(Long profileId, Long mentorId) {
        if (favoriteRepository.findByProfileIdAndMentorId(profileId, mentorId).isPresent()) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_EXISTS);
        }
    }

    private Favorite createFavorite(Profile profile, Mentor mentor) {
        Favorite favorite = new Favorite();
        favorite.setProfile(profile);
        favorite.setMentor(mentor);
        return favorite;
    }

    private void validateSelfFavorite(Profile profile, Mentor mentor) {
        if (profile.getMember().getId().equals(mentor.getMember().getId())) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_FAVORITE_SELF);
        }
    }
}
