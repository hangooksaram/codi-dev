package codi.backend.domain.mentor.entity;

import codi.backend.domain.favorite.entity.Favorite;
import codi.backend.domain.member.entity.Member;
import codi.backend.domain.mentoring.entity.Mentoring;
import codi.backend.domain.schedule.entity.Schedule;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Mentor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mentor_id")
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
    private String jobName;

    @Column
    private Boolean inOffice = false;

    @Column
    private String introduction;

    @Column
    private Double star = 0.0;

    @Column
    private Integer mentees = 0;

    @ElementCollection
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "mentor_mentoring_category")
    @Column(name = "mentoring_category")
    private List<MentoringCategory> mentoringCategories = new ArrayList<>(4);

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    // 현재는 사용하지 않지만 추후 follower에 대한 데이터가 필요하다면 사용 가능하다.
    @OneToMany(mappedBy = "mentor", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Favorite> followers = new HashSet<>();

    @OneToMany(mappedBy = "mentor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Mentoring> mentoringList = new ArrayList<>();

    @OneToMany(mappedBy = "mentor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Schedule> schedules = new ArrayList<>();

    public void addFollower(Favorite favorite) {
        this.followers.add(favorite);
        favorite.setMentor(this);
    }

    public void removeFollower(Favorite favorite) {
        this.followers.remove(favorite);
        favorite.setMentor(null);
    }

    public void addMentoring(Mentoring mentoring) {
        this.mentoringList.add(mentoring);
        mentoring.setMentor(this);
    }

    public enum MentoringCategory {
        SHARINGEXPERIENCE("경험공유"),
        PREPARINGINTERVIEW("면접대비"),
        SOCIALSKILL("사회생활"),
        PRACTICALSKILL("실무/기술"),
        WORKCOMPETENCY("업무역량"),
        JOBINFORMATION("일자리정보"),
        PREPARATIONEMPLOY("취업준비"),
        CAREERDIRECTION("커리어방향");

        @Getter
        private final String mentoringCategory;

        MentoringCategory(String mentoringCategory) {
            this.mentoringCategory = mentoringCategory;
        }
    }

    @Builder
    public Mentor(Long id, String fileUrl, Boolean isCertificate, String company, String job, String career, String jobName, Boolean inOffice, String introduction, Double star, Integer mentees, List<MentoringCategory> mentoringCategories) {
        this.id = id;
        this.fileUrl = fileUrl;
        this.isCertificate = isCertificate;
        this.company = company;
        this.job = job;
        this.career = career;
        this.jobName = jobName;
        this.inOffice = inOffice;
        this.introduction = introduction;
        this.star = star;
        this.mentees = mentees;
        this.mentoringCategories = mentoringCategories;
    }

    public void setMember(Member member) {
        this.member = member;
    }
}
