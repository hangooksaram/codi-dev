package codi.backend.domain.member.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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
    @JoinColumn(name = "MEMBER_ID")
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
