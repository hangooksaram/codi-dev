package codi.backend.domain.member.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PROFILE_ID")
    private Long id;

    @Column
    private String imgUrl;

    @Column
    private String job;

    @Column
    private String career;

    @Column
    private String education;

    @Column
    private String disability;

    @Column
    private String severity;

    @Column
    private String period;

    @OneToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Builder
    public Profile(Long id, String imgUrl, String job, String career, String education, String disability, String severity, String period) {
        this.id = id;
        this.imgUrl = imgUrl;
        this.job = job;
        this.career = career;
        this.education = education;
        this.disability = disability;
        this.severity = severity;
        this.period = period;
    }

    public void setMember(Member member) {
        this.member = member;
    }
}
