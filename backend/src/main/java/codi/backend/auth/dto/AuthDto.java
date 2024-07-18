package codi.backend.auth.dto;

import lombok.Getter;
import lombok.Setter;

public class AuthDto {
    @Getter
    @Setter
    public static class CheckToken {
        private Boolean isLoggedIn;
    }

    @Getter
    @Setter
    public static class CheckLoginInfo {
        private Long id;
        private String email;
        private Boolean isProfile;
        private Boolean isMentor;
        private String profileImageUrl;
    }
}
