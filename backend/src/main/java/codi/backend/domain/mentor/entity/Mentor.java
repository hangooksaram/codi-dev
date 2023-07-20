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
    private Boolean isCertificate = false;

    @Column
    private String company;

    @Column
    private String job;

    @Column
    private String career;

    @Column
    private Boolean inOffice = false;

    @Column
    private String introduction;

    @Column
    private Double star = 0.0;

    @Column
    private Integer mentees = 0;

    @OneToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Builder
    public Mentor(Long id, String fileUrl, String company, String job, String career, Boolean inOffice, String introduction) {
        this.id = id;
        this.fileUrl = fileUrl;
        this.company = company;
        this.job = job;
        this.career = career;
        this.introduction = introduction;
        this.inOffice = inOffice;
    }

    public void setMember(Member member) {
        this.member = member;
    }
}
