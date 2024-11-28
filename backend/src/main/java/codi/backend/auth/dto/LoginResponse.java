package codi.backend.auth.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class LoginResponse {
    private String id;
    private String roles;

//    public static LoginResponse of(Member member) {
//        return LoginResponse.builder()
//                .id(member.getId())
//                .roles(String.join(",", member.getRoles()))
//                .build();
//    }
}
