package codi.backend.domain.profile.service;

import codi.backend.domain.profile.entity.Profile;
import org.springframework.web.multipart.MultipartFile;

public interface ProfileService {
    // Profile
    Profile updateProfileInformation(String memberId, Profile profile);
    Profile createProfile(String memberId, Profile profile, MultipartFile file);
    Profile findProfile(String memberId);
}
