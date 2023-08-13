package codi.backend.domain.profile.service;

import codi.backend.domain.profile.entity.Profile;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProfileService {
    Profile createProfile(String memberId, Profile profile, MultipartFile file);
    Profile updateProfileInformation(Long profileId, Profile profile, MultipartFile file);
    Profile findProfile(Long profileId);
    void deleteProfileImg(Long profileId);
    List<Long> getFavoriteMentorIds(Long profileId);
}
