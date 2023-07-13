package codi.backend.domain.mentor.entity;

import codi.backend.domain.member.entity.Member;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Mentor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MENTOR_ID")
    private Long id;

    @Column
    private String fileUrl;

    @Column
    private String company;

    @Column
    private String job;

    @Column
    private Integer career;

    @Column
    private String introduction;

    @OneToOne
    @JoinColumn(name = "MEMBER_ID", unique = true)
    private Member member;

    @Builder
    public Mentor(Long id, String fileUrl, String company, String job, Integer career, String introduction) {
        this.id = id;
        this.fileUrl = fileUrl;
        this.company = company;
        this.job = job;
        this.career = career;
        this.introduction = introduction;
    }

    public void setMember(Member member) {
        this.member = member;
    }
}
