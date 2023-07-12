package codi.backend.domain.member.dto;

import codi.backend.domain.member.entity.Member;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.List;

public class MemberDto {

    @Getter
    @Builder
    public static class MemberPost {
        @NotBlank
        @ApiModelProperty(example = "회원 ID")
        private String id;

        @NotBlank
        @ApiModelProperty(example = "이름")
        private String name;

        @NotNull
        @ApiModelProperty(example = "생년월일(yyyy-mm-dd)")
        private String birth;

        @NotNull
        @ApiModelProperty(example = "남자 또는 여자")
        private Member.Gender gender;

        @NotBlank
        @ApiModelProperty(example = "email@address.com")
        private String email;

        @NotNull
        @Pattern(regexp ="^(?=.*\\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\\da-zA-Z~!@#$%^&*]+$",
                message = "영문자와 숫자로 구성되며 최소 하나 이상의 특수문자(~!@#$%^&*)가 포함되어야합니다. "+
                        "공백은 포함될 수 없습니다.")
        @Size(min = 8, max = 16)
        @ApiModelProperty(example = "비밀번호 입력, 최소 8자 ~ 최대 16자, 최소 하나 이상의 특수문자가 포함되어야 함")
        private String password;
    }

    @Getter
    @Builder
    public static class MemberPatch {
        @ApiModelProperty("현재 비밀번호")
        private String oldPassword;

        @ApiModelProperty("새 비밀번호")
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
        private Member.Gender gender;

        @ApiModelProperty(example = "email@address.com")
        private String email;

        @ApiModelProperty(example = "역할: 멘티 / 멘토 / 관리자")
        private List<String> roles;
    }
}
