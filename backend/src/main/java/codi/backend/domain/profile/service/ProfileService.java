package codi.backend.domain.profile.service;

import codi.backend.domain.profile.entity.Profile;

public interface ProfileService {
    // Profile
    Profile updateProfileInformation(String memberId, Profile profile);
    Profile createProfile(String memberId, Profile profile);
    Profile findProfile(String memberId);
}
