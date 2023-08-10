package codi.backend.domain.mentoring.repository;

import codi.backend.domain.mentoring.entity.QMentoring;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

@Repository
public class MentoringRepositoryImpl implements MentoringRepositoryCustom {
    private final JPAQueryFactory jpaQueryFactory;
    private final QMentoring mentoring = QMentoring.mentoring;

    public MentoringRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }


}
