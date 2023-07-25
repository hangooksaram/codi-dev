package codi.backend.domain.member.utils;

import codi.backend.domain.member.entity.Member;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomAuthorityUtils {

    private static String ADMIN_EMAIL;

    @Value("${admin.email}")
    public void setAdminEmail(String value) {
        ADMIN_EMAIL = value;
    }

    // DB 저장용(회원가입) - 회원가입 시에는 ADMIN OR MENTEE만 가능
    public static List<String> createRoles(Member member) {
        if (member != null && member.getEmail().equals(ADMIN_EMAIL)) {
            return List.of(Member.MemberRole.ADMIN.name(), Member.MemberRole.MENTOR.name(), Member.MemberRole.MENTEE.name());
        } else if (member != null && member.getMentor() != null) {
            return List.of(Member.MemberRole.MENTOR.name(), Member.MemberRole.MENTEE.name());
        }

        return List.of(Member.MemberRole.MENTEE.name());
    }

    // DB에 저장된 Role을 기반으로 권한 정보 생성, 추후 UserDetails 구현시 사용
    public static List<GrantedAuthority> createAuthorities(List<String> roles) {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
    }
}
