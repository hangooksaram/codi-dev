package codi.backend.domain.member.mapper;

import codi.backend.domain.member.dto.MemberDto;
import codi.backend.domain.member.dto.ProfileDto;
import codi.backend.domain.member.entity.Member;
import codi.backend.domain.member.entity.Profile;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    // Member
    default Member memberPostDtoToMember(MemberDto.MemberPost memberPostDto) {
        if (memberPostDto == null) {
            return null;
        }

        return Member.builder()
                .id(memberPostDto.getId())
                .name(memberPostDto.getName())
                .birth(memberPostDto.getBirth())
                .gender(memberPostDto.getGender())
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
                .name(member.getName())
                .birth(member.getBirth())
                .gender(member.getGender())
                .email(member.getEmail())
                .roles(member.getRoles())
                .build();
    }
}
