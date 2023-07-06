package codi.backend.domain.member.service;

import codi.backend.domain.member.dto.MemberDto;
import codi.backend.domain.member.dto.MentorDto;
import codi.backend.domain.member.entity.Member;
import codi.backend.domain.member.entity.Mentor;
import codi.backend.domain.member.entity.Profile;

public interface MemberService {
    // POST
    Member createMember(Member member);
    Member findMember(String memberId);
    Profile createProfile(String memberId, Profile profile);
    Mentor becomeMentor(String memberId, Mentor mentor);

    // PATCH
    void updateMemberInformation(String memberId, String oldPassword, String newPassword);
    Mentor updateMentorInformation(String memberId, Mentor mentor);
    Profile updateProfileInformation(String memberId, Profile profile);

}
