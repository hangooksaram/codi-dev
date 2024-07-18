package codi.backend.domain.mentoring.entity;

import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.profile.entity.Profile;
import codi.backend.domain.schedule.entity.Schedule;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "new_mentoring")
public class Mentoring {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column
    private MentoringStatus mentoringStatus;

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

    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    public enum MentoringStatus {
        APPLICATION,
        ACCEPTED,
        REJECTED,
        COMPLETED;
    }

    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    public enum MentoringPlatform {
        GOOGLE("Google Meeting"),
        KAKAO("KakaoTalk"),
        DISCORD("Discord"),
        ZOOM("ZOOM");

        @Getter
        private final String platform;

        MentoringPlatform(String platform) {
            this.platform = platform;
        }

        public static MentoringPlatform platformOf(String name) {
            for (MentoringPlatform platform : MentoringPlatform.values()) {
                if (platform.getPlatform().equals(name)) {
                    return platform;
                }
            }
            return null;
        }
    }

    @Builder
    public Mentoring(Long id, MentoringStatus mentoringStatus, String applicationReason, Mentor mentor, Profile profile, Schedule schedule) {
        this.id = id;
        this.mentoringStatus = mentoringStatus;
        this.applicationReason = applicationReason;
        this.mentor = mentor;
        this.profile = profile;
        this.schedule = schedule;
    }
}
