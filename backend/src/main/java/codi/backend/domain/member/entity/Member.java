package codi.backend.domain.member.entity;

import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.profile.entity.Profile;
import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.exception.ExceptionCode;
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
    @Column(name = "MEMBER_ID", unique = true, updatable = false)
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

    // TODO 추후 서비스 로직에서 member 객체의 mentor 또는 profile의 처리를 한 번에 가능하도록 한다.
    public Mentor getMentor() {
        if (mentor == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_MENTOR_ERROR);
        }
        return mentor;
    }

    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL)
    private Profile profile;

    public Profile getProfile() {
        if (profile == null) {
            throw new BusinessLogicException(ExceptionCode.PROFILE_NOT_FOUND);
        }
        return profile;
    }

    public enum Gender {
        MAN("남자"),
        NOT_CHECKED("선택안함"),
        WOMAN("여자");

        Gender(String gender) {
            this.gender = gender;
        }

        @Getter
        private String gender;
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
