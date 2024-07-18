package codi.backend.domain.member.mapper;

import codi.backend.domain.member.dto.MemberDto;
import codi.backend.domain.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    default Member memberPostDtoToMember(MemberDto.MemberPost memberPostDto) {
        if (memberPostDto == null) {
            return null;
        }
        return Member.builder()
                .email(memberPostDto.getEmail())
                .password(memberPostDto.getPassword())
                .build();
    }
    default MemberDto.MemberResponse memberToMemberResponse(Member member) {
        if (member == null) {
            return null;
        }
        return MemberDto.MemberResponse.builder()
                .id(member.getId())
                .email(member.getEmail())
                .roles(member.getRoles())
                .build();
    }
}
