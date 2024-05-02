package codi.backend.domain.member.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class AccountDto {

    @Getter
    public static class FindIdDto {
        @Email
        @NotBlank
        @ApiModelProperty(example = "email@address.com")
        private String email;
    }

    @Getter
    public static class FindPwDto {
        @NotBlank
        @ApiModelProperty(example = "회원 ID")
        private String id;

        @Email
        @NotBlank
        @ApiModelProperty(example = "email@address.com")
        private String email;
    }
}
