package codi.backend.domain.schedule.repository;

import codi.backend.domain.mentor.entity.Mentor;
import codi.backend.domain.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long>, ScheduleRepositoryCustom {
    List<Schedule> findAllByMentor(Mentor mentor);
    Optional<Schedule> findByMentorAndStartDateTimeAndEndDateTime(Mentor mentor, LocalDateTime startTime, LocalDateTime endTime);
}
