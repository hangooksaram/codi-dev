package codi.backend.domain.member.service;

import codi.backend.domain.member.entity.Member;

public interface MemberService {
    Member createMember(Member member);
    Member findMember(String memberId);
    void updateMemberInformation(String memberId, String oldPassword, String newPassword);
}
