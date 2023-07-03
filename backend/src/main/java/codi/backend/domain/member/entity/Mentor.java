package codi.backend.domain.member.entity;

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
    private String job;

    @Column
    private String company;

    @Column
    private String introduction;

    @OneToOne
    @JoinColumn(name = "MEMBER_ID", unique = true)
    private Member member;

    @Builder
    public Mentor(Long id, String fileUrl, String job, String company, String introduction) {
        this.id = id;
        this.fileUrl = fileUrl;
        this.job = job;
        this.company = company;
        this.introduction = introduction;
    }

    public void setMember(Member member) {
        this.member = member;
    }
}
