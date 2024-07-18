package codi.backend.domain.favorite.service;

import codi.backend.domain.favorite.dto.FavoriteDto;
import codi.backend.domain.favorite.entity.Favorite;
import codi.backend.domain.favorite.repository.FavoriteRepository;
import codi.backend.domain.mentor.dto.MentorDto;
import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.mentor.service.MentorService;
import codi.backend.domain.profile.entity.Profile;
import codi.backend.domain.profile.service.ProfileService;
import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoriteServiceImpl implements FavoriteService{
    private final FavoriteRepository favoriteRepository;
    private final ProfileService profileService;
    private final MentorService mentorService;

    public FavoriteServiceImpl(FavoriteRepository favoriteRepository, ProfileService profileService, MentorService mentorService) {
        this.favoriteRepository = favoriteRepository;
        this.profileService = profileService;
        this.mentorService = mentorService;
    }

    @Transactional
    @Override
    public void addFavorite(Long profileId, Long mentorId) {
        Profile profile = profileService.findProfile(profileId);
        Mentor mentor = mentorService.findMentor(mentorId);

        // 자기 자신을 관심 목록에 추가하는지 체크
        validateSelfFavorite(profile, mentor);

        // 이미 추가된 멘토인지 확인
        validateAlreadyFavorite(profile, mentor);

        Favorite favorite = createFavorite(profile, mentor);

        profile.addFavorite(favorite);
        mentor.addFollower(favorite);
    }

    @Transactional
    @Override
    public void removeFavorite(Long profileId, Long mentorId) {
        Favorite favorite = findFavorite(profileId, mentorId);

        Profile profile = profileService.findProfile(profileId);
        Mentor mentor = mentorService.findMentor(mentorId);

        validateSelfFavorite(profile, mentor);

        profile.removeFavorite(favorite);
        mentor.removeFollower(favorite);
    }

    private Favorite findFavorite(Long profileId, Long mentorId) {
        return favoriteRepository.findByProfileIdAndMentorId(profileId, mentorId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FAVORITE_NOT_FOUND));
    }

    private void validateAlreadyFavorite(Profile profile, Mentor mentor) {
        if (favoriteRepository.findByProfileIdAndMentorId(profile.getId(), mentor.getId()).isPresent()) {
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

    @Override
    public FavoriteDto.FavoriteListResponse findFavorites(Long profileId) {
        Profile profile = profileService.findProfile(profileId);
        List<Long> favorites = profile != null ? profile.getFavorites()
                .stream()
                .map(f -> f.getMentor().getId())
                .sorted()
                .collect(Collectors.toList()) : null;

        return FavoriteDto.FavoriteListResponse.builder()
                .favorites(favorites)
                .build();
    }

    @Override
    public List<MentorDto.SearchMentorResponse> getFavoriteMentors(Long profileId) {
        Profile profile = profileService.findProfile(profileId);
        List<Favorite> favorites = favoriteRepository.findByProfile(profile);

        return favorites.stream()
                .map(fav -> {
                    Mentor mentor = fav.getMentor();
                    return MentorDto.SearchMentorResponse.builder()
                            .mentorId(mentor.getId())
                            .nickname(mentor.getMember().getProfile().getNickname())
                            .imgUrl(mentor.getMember().getProfile().getImgUrl())
                            .career(mentor.getCareer())
                            .job(mentor.getJob())
                            .disability(mentor.getMember().getProfile().getDisability())
                            .severity(mentor.getMember().getProfile().getSeverity())
                            .star(mentor.getStar())
                            .mentees(mentor.getMentees())
                            .build();
                })
                .collect(Collectors.toList());
    }
}
