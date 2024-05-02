package codi.backend.auth.userdetails;

import codi.backend.auth.utils.CustomAuthorityUtils;
import codi.backend.domain.member.entity.Member;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
public final class CustomUserDetails extends Member implements UserDetails {
    private String id;
    private String password;
    private List<String> roles;
    private Long profileId;
    private Long mentorId;

    public CustomUserDetails(Member member) {
        this.id = member.getId();
        this.password = member.getPassword();
        this.roles = member.getRoles();
        if (member.getProfile() != null) {
            this.profileId = member.getProfile().getId();
        }
        if (member.getMentor() != null) {
            this.mentorId = member.getMentor().getId();
        }
    }

    public CustomUserDetails(String id, List<String> roles, Long profileId, Long mentorId) {
        this.id = id;
        this.roles = roles;
        this.profileId = profileId;
        this.mentorId = mentorId;
    }

    public void setProfileId(Long profileId) {
        this.profileId = profileId;
    }

    public void setMentorId(Long mentorId) {
        this.mentorId = mentorId;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return CustomAuthorityUtils.createAuthorities(this.roles);
    }

    @Override
    public String getUsername() {
        return getId();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
