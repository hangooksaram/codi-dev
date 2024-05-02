package codi.backend.domain.member.dto;

import codi.backend.domain.member.entity.Member;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.*;
import java.util.List;

public class MemberDto {
    @Getter
    @Builder
    public static class MemberPost {
        @NotBlank
        @Pattern(regexp = "^[a-z0-9]{4,12}$", message = "ID는 최소 4글자 이상, 12글자 이하의 소문자와 숫자만 포함해야 합니다.")
        @ApiModelProperty(example = "회원 ID")
        private String id;

        @NotBlank
        @ApiModelProperty(example = "이름")
        private String name;

        @NotBlank
        @ApiModelProperty(example = "생년월일(yyyy-mm-dd)")
        private String birth;

        @NotNull
        @ApiModelProperty(example = "남자 또는 여자")
        private Member.Gender gender;

        @Email
        @NotBlank
        @ApiModelProperty(example = "email@address.com")
        private String email;

        @NotBlank
        @Pattern(regexp ="^(?=.*\\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\\da-zA-Z~!@#$%^&*]+$",
                message = "영문자와 숫자로 구성되며 최소 하나 이상의 특수문자(~!@#$%^&*)가 포함되어야합니다." +
                        "공백은 포함될 수 없습니다.")
        @Size(min = 8, max = 16)
        @ApiModelProperty(example = "비밀번호 입력, 최소 8자 ~ 최대 16자, 최소 하나 이상의 특수문자가 포함되어야 함")
        private String password;
    }

    @Getter
    public static class MemberPatch {
        @ApiModelProperty("현재 비밀번호")
        private String oldPassword;

        @ApiModelProperty("새 비밀번호")
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
        @ApiModelProperty(example = "회원 ID")
        private String id;

        @ApiModelProperty(example = "이름")
        private String name;

        @ApiModelProperty(example = "생년월일(yyyy-mm-dd)")
        private String birth;

        @ApiModelProperty(example = "남자 또는 여자")
        private String gender;

        @ApiModelProperty(example = "email@address.com")
        private String email;

        @ApiModelProperty(example = "역할: 멘티 / 멘토 / 관리자")
        private List<String> roles;
    }
}
