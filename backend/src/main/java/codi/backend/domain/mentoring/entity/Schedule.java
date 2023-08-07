package codi.backend.domain.mentoring.entity;

import codi.backend.domain.mentor.entity.Mentor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime startDateTime;

    @Column(nullable = false)
    private LocalDateTime endDateTime;

    @ManyToOne
    @JoinColumn(name = "mentor_id")
    private Mentor mentor;

    @OneToOne(mappedBy = "schedule")
    private Mentoring mentoring;

    @Builder
    public Schedule(Long id, LocalDateTime startDateTime, LocalDateTime endDateTime, Mentor mentor, Mentoring mentoring) {
        this.id = id;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.mentor = mentor;
        this.mentoring = mentoring;
    }
}
