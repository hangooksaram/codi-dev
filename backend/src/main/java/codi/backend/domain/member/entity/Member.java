package codi.backend.domain.member.entity;

import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.profile.entity.Profile;
import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.exception.ExceptionCode;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Entity
@NoArgsConstructor
public class Member {
    @Id
    @Column(name = "member_id", unique = true, updatable = false)
    private String id;

    @Column(nullable = false)
    private String name;

    @Column
    private String birth;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL)
    private Mentor mentor;

    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL)
    private Profile profile;

    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    public enum Gender {
        MAN("남자"),
        NOT_CHECKED("선택안함"),
        WOMAN("여자");

        @Getter
        private final String gender;

        Gender(String gender) {
            this.gender = gender;
        }

        public static Gender genderOf(String name) {
            for (Gender gender : Gender.values()) {
                if (gender.getGender().equals(name)) {
                    return gender;
                }
            }
            return null;
        }
    }

    public enum MemberRole {
        ADMIN,
        MENTOR,
        MENTEE
    }

    @Builder
    public Member(String id, String name, String birth, Gender gender, String email, String password, List<String> roles) {
        this.id = id;
        this.name = name;
        this.birth = birth;
        this.gender = gender;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }
}
