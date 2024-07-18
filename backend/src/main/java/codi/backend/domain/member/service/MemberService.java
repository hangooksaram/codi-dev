package codi.backend.domain.member.service;

import codi.backend.domain.member.dto.MemberDto;
import codi.backend.domain.member.entity.Member;

public interface MemberService {
    Member createMember(Member member);
    Member findMember(String email);
    void updateMemberInformation(String email, MemberDto.MemberPatch memberPatchDto);
}
