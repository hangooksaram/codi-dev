package codi.backend.auth.utils;

import codi.backend.domain.member.entity.Member;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomAuthorityUtils {
    @Value("${admin.email}")
    private String adminMail;
    private final List<GrantedAuthority> ADMIN_ROLES = AuthorityUtils.createAuthorityList("ROLE_ADMIN", "ROLE_MENTOR", "ROLE_MENTEE");
    private final List<GrantedAuthority> MENTOR_ROLES = AuthorityUtils.createAuthorityList("ROLE_MENTOR", "ROLE_MENTEE");
    private final List<GrantedAuthority> MENTEE_ROLES = AuthorityUtils.createAuthorityList("ROLE_MENTEE");
    private final List<String> ADMIN_ROLES_STRING = List.of("ADMIN", "MENTOR", "MENTEE");
    private final List<String> MENTOR_ROLES_STRING = List.of("MENTOR", "MENTEE");
    private final List<String> MENTEE_ROLES_STRING = List.of("MENTEE");

    // DB 저장용(회원가입) - 회원가입 시에는 ADMIN OR MENTEE만 가능
    public List<String> createRoles(Member member) {
        if (member != null && member.getEmail().equals(adminMail)) {
            return ADMIN_ROLES_STRING;
        } else if (member != null && member.getMentor() != null) {
            return MENTOR_ROLES_STRING;
        }
        return MENTEE_ROLES_STRING;
    }

    // 메모리 상의 Role을 기반으로 권한 정보 생성
    public List<GrantedAuthority> createAuthorities(Member member) {
        if (member != null && member.getEmail().equals(adminMail)) {
            return ADMIN_ROLES;
        } else if (member != null && member.getMentor() != null) {
            return MENTOR_ROLES;
        }
        return MENTEE_ROLES;
    }

    // DB에 저장된 Role을 기반으로 권한 정보 생성
    public static List<GrantedAuthority> createAuthorities(List<String> roles) {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
    }
}
