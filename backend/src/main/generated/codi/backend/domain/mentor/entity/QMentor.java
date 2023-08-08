package codi.backend.domain.mentor.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMentor is a Querydsl query type for Mentor
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMentor extends EntityPathBase<Mentor> {

    private static final long serialVersionUID = -359907854L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMentor mentor = new QMentor("mentor");

    public final StringPath career = createString("career");

    public final StringPath company = createString("company");

    public final StringPath fileUrl = createString("fileUrl");

    public final SetPath<codi.backend.domain.favorite.entity.Favorite, codi.backend.domain.favorite.entity.QFavorite> followers = this.<codi.backend.domain.favorite.entity.Favorite, codi.backend.domain.favorite.entity.QFavorite>createSet("followers", codi.backend.domain.favorite.entity.Favorite.class, codi.backend.domain.favorite.entity.QFavorite.class, PathInits.DIRECT2);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath inOffice = createBoolean("inOffice");

    public final StringPath introduction = createString("introduction");

    public final BooleanPath isCertificate = createBoolean("isCertificate");

    public final StringPath job = createString("job");

    public final StringPath jobName = createString("jobName");

    public final codi.backend.domain.member.entity.QMember member;

    public final NumberPath<Integer> mentees = createNumber("mentees", Integer.class);

    public final ListPath<Mentor.MentoringCategory, EnumPath<Mentor.MentoringCategory>> mentoringCategories = this.<Mentor.MentoringCategory, EnumPath<Mentor.MentoringCategory>>createList("mentoringCategories", Mentor.MentoringCategory.class, EnumPath.class, PathInits.DIRECT2);

    public final ListPath<codi.backend.domain.mentoring.entity.Mentoring, codi.backend.domain.mentoring.entity.QMentoring> mentoringList = this.<codi.backend.domain.mentoring.entity.Mentoring, codi.backend.domain.mentoring.entity.QMentoring>createList("mentoringList", codi.backend.domain.mentoring.entity.Mentoring.class, codi.backend.domain.mentoring.entity.QMentoring.class, PathInits.DIRECT2);

    public final ListPath<codi.backend.domain.schedule.entity.Schedule, codi.backend.domain.schedule.entity.QSchedule> schedules = this.<codi.backend.domain.schedule.entity.Schedule, codi.backend.domain.schedule.entity.QSchedule>createList("schedules", codi.backend.domain.schedule.entity.Schedule.class, codi.backend.domain.schedule.entity.QSchedule.class, PathInits.DIRECT2);

    public final NumberPath<Double> star = createNumber("star", Double.class);

    public QMentor(String variable) {
        this(Mentor.class, forVariable(variable), INITS);
    }

    public QMentor(Path<? extends Mentor> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMentor(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMentor(PathMetadata metadata, PathInits inits) {
        this(Mentor.class, metadata, inits);
    }

    public QMentor(Class<? extends Mentor> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new codi.backend.domain.member.entity.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

