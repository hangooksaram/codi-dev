package codi.backend.domain.member.entity;

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
    @Column(name = "MEMBER_ID", unique = true)
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
    public Member(String id, String name, String birth, Gender gender, String email, String password) {
        this.id = id;
        this.name = name;
        this.birth = birth;
        this.gender = gender;
        this.email = email;
        this.password = password;
//        this.roles = roles;
    }
}
