package codi.backend.domain.member.service;

import codi.backend.domain.member.entity.Member;
import codi.backend.domain.member.entity.Mentor;
import codi.backend.domain.member.entity.Profile;

public interface MemberService {

    Member createMember(Member member);
    Member findMember(String memberId);
    Profile createProfile(String memberId, Profile profile);
    Mentor becomeMentor(String memberId, Mentor mentor);

}
