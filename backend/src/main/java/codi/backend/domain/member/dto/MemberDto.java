package codi.backend.domain.member.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.List;

public class MemberDto {
    @Getter
    @Builder
    public static class MemberPost {
        @Email
        @NotBlank
        @Schema(example = "email@address.com")
        private String email;

        @NotBlank
        @Pattern(regexp ="^(?=.*\\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\\da-zA-Z~!@#$%^&*]+$",
                message = "영문자와 숫자로 구성되며 최소 하나 이상의 특수문자(~!@#$%^&*)가 포함되어야합니다." +
                        "공백은 포함될 수 없습니다.")
        @Size(min = 8, max = 16)
        @Schema(example = "비밀번호 입력, 최소 8자 ~ 최대 16자, 최소 하나 이상의 특수문자가 포함되어야 함")
        private String password;
    }

    @Getter
    public static class MemberPatch {
        @Schema(example = "현재 비밀번호")
        private String oldPassword;

        @Schema(example = "새 비밀번호")
        @Pattern(regexp ="^(?=.*\\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\\da-zA-Z~!@#$%^&*]+$",
                message = "영문자와 숫자로 구성되며 최소 하나 이상의 특수문자(~!@#$%^&*)가 포함되어야합니다. "+
                        "공백은 포함될 수 없습니다.")
        @Size(min = 8, max = 16)
        private String newPassword;
    }

    @Schema(description = "회원정보 응답 DTO")
    @Getter
    @Builder
    public static class MemberResponse {
        @Schema(example = "회원 ID")
        private Long id;

        @Schema(example = "email@address.com")
        private String email;

        @Schema(example = "역할: 멘티 / 멘토 / 관리자")
        private List<String> roles;
    }
}
