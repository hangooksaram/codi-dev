package codi.backend.global.specification;

import codi.backend.domain.member.entity.Mentor;
import org.springframework.data.jpa.domain.Specification;

public class MentorSpecs {
    public static Specification<Mentor> hasJob(String job) {
        if (job == null) return null;
        return (root, query, cb) -> cb.equal(root.get("member").get("profile").get("job"), job);
    }

    public static Specification<Mentor> hasCareer(String career) {
        if (career == null) return null;
        return (root, query, cb) -> cb.equal(root.get("member").get("profile").get("career"), career);
    }

    public static Specification<Mentor> hasDisability(String disability) {
        if (disability == null) return null;
        return (root, query, cb) -> cb.equal(root.get("member").get("profile").get("disability"), disability);
    }

    public static Specification<Mentor> containsKeyword(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) return null;
        return (root, query, cb) -> {
            String pattern = "%" + keyword + "%";
            return cb.or(
                    cb.like(root.get("member").get("name"), pattern),
                    cb.like(root.get("introduction"), pattern)
            );
        };
    }
}
