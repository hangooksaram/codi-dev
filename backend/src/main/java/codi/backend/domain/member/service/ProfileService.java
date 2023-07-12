package codi.backend.domain.member.service;

import codi.backend.domain.member.entity.Profile;

public interface ProfileService {
    // Profile
    Profile updateProfileInformation(String memberId, Profile profile);
    Profile createProfile(String memberId, Profile profile);
    Profile findProfile(String memberId);
}
