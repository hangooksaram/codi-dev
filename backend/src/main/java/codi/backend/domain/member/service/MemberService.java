package codi.backend.domain.member.service;

import codi.backend.domain.member.entity.Member;
import codi.backend.domain.member.entity.Mentor;
import codi.backend.domain.member.entity.Profile;

public interface MemberService {
    // Member
    Member createMember(Member member);
    Member findMember(String memberId);
    void updateMemberInformation(String memberId, String oldPassword, String newPassword);
}
