package codi.backend.domain.member.dto;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class AccountDto {

    @Getter
    public static class FindIdDto {
        @Email
        @NotBlank
        private String email;
    }

    @Getter
    public static class FindPwDto {
        @NotBlank
        private String id;

        @Email
        @NotBlank
        private String email;
    }
}
