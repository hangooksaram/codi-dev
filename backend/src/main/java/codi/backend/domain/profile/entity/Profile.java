package codi.backend.domain.profile.entity;

import codi.backend.domain.member.entity.Member;
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
    private String desiredJob;

    @Column
    private String education;

    @Column
    private String disability;

    @Column
    private String severity;

    @Column
    private String period;

    @Column
    private String introduction;

    @OneToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Builder
    public Profile(Long id, String imgUrl, String desiredJob, String education, String disability, String severity, String period, String introduction) {
        this.id = id;
        this.imgUrl = imgUrl;
        this.desiredJob = desiredJob;
        this.education = education;
        this.disability = disability;
        this.severity = severity;
        this.period = period;
        this.introduction = introduction;
    }

    public void setMember(Member member) {
        this.member = member;
    }
}
