package codi.backend.domain.member.dto;

import lombok.*;

import java.util.List;


public class GaraDto {
    @Getter
    public static class LoginDto {
        private String id;
        private String password;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class LoginResponse {
        private String id;
        private Long profileId;
        private Long mentorId;
        private String imgUrl;
        private List<Long> favorites;
    }
}
