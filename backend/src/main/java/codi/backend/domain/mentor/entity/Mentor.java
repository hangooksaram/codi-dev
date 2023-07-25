package codi.backend.domain.mentor.entity;

import codi.backend.domain.favorite.entity.Favorite;
import codi.backend.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

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

    // 현재는 사용하지 않지만 추후 follower에 대한 데이터가 필요하다면 사용 가능하다.
    @OneToMany(mappedBy = "mentor", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Favorite> followers = new HashSet<>();

    public void addFollower(Favorite favorite) {
        this.followers.add(favorite);
        favorite.setMentor(this);
    }

    public void removeFollower(Favorite favorite) {
        this.followers.remove(favorite);
        favorite.setMentor(null);
    }

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
