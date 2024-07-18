package codi.backend.domain.member.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
public class AccountDto {
    @Email
    @NotBlank
    @Schema(example = "email@address.com")
    private String email;

//    @Getter
//    public static class FindIdDto {
//        @Email
//        @NotBlank
//        @Schema(example = "email@address.com")
//        private String email;
//    }
//
//    @Getter
//    public static class FindPwDto {
//        @NotBlank
//        @Schema(example = "회원 ID")
//        private Long id;
//
//        @Email
//        @NotBlank
//        @Schema(example = "email@address.com")
//        private String email;
//    }
}
