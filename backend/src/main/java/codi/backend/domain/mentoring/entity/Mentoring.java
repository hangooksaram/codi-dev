package codi.backend.domain.mentoring.entity;

import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.profile.entity.Profile;
import codi.backend.domain.schedule.entity.Schedule;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Mentoring {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column
    private MentoringStatus status;

    @Column
    private String applicationReason;

    @Enumerated(EnumType.STRING)
    @Column
    private MentoringPlatform mentoringPlatform;

    @Column
    private String link;

    @Column
    private Double rating;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mentor_id")
    private Mentor mentor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id")
    private Profile profile;

    @OneToOne
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;

    public enum MentoringStatus {
        APPLICATION("신청"),
        ACCEPTED("수락"),
        REJECTED("거절"),
        COMPLETED("완료");

        @Getter
        private final String status;

        MentoringStatus(String status) {
            this.status = status;
        }
    }

    public enum MentoringPlatform {
        GOOGLE,
        KAKAO,
        DISCORD,
        ZOOM
    }

    @Builder
    public Mentoring(Long id, MentoringStatus status, String applicationReason, Mentor mentor, Profile profile, Schedule schedule) {
        this.id = id;
        this.status = status;
        this.applicationReason = applicationReason;
        this.mentor = mentor;
        this.profile = profile;
        this.schedule = schedule;
    }
}
