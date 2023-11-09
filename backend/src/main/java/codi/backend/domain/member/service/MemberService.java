package codi.backend.domain.member.service;

import codi.backend.domain.member.dto.GaraDto;
import codi.backend.domain.member.dto.MemberDto;
import codi.backend.domain.member.entity.Member;

public interface MemberService {
    Member createMember(Member member);
    Member findMember(String memberId);
    void updateMemberInformation(String memberId, MemberDto.MemberPatch memberPatchDto);
    GaraDto.LoginResponse loginMember(GaraDto.LoginDto loginDto);
}
