package codi.backend.domain.member.service;

import codi.backend.domain.member.dto.MemberDto;
import codi.backend.domain.member.dto.MentorDto;
import codi.backend.domain.member.entity.Member;
import codi.backend.domain.member.entity.Mentor;
import codi.backend.domain.member.entity.Profile;

public interface MemberService {
    // Member
    Member createMember(Member member);
    Member findMember(String memberId);
    void updateMemberInformation(String memberId, String oldPassword, String newPassword);

    // Mentor
    Mentor updateMentorInformation(String memberId, Mentor mentor);
    Mentor becomeMentor(String memberId, Mentor mentor);
    Mentor findMentor(String memberId);

    // Profile
    Profile updateProfileInformation(String memberId, Profile profile);
    Profile createProfile(String memberId, Profile profile);
    Profile findProfile(String memberId);
}
