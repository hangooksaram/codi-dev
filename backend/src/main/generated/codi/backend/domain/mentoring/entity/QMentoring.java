package codi.backend.domain.mentoring.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMentoring is a Querydsl query type for Mentoring
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMentoring extends EntityPathBase<Mentoring> {

    private static final long serialVersionUID = -627172170L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMentoring mentoring = new QMentoring("mentoring");

    public final StringPath applicationReason = createString("applicationReason");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath link = createString("link");

    public final codi.backend.domain.mentor.entity.QMentor mentor;

    public final EnumPath<Mentoring.MentoringPlatform> mentoringPlatform = createEnum("mentoringPlatform", Mentoring.MentoringPlatform.class);

    public final codi.backend.domain.profile.entity.QProfile profile;

    public final codi.backend.domain.schedule.entity.QSchedule schedule;

    public final EnumPath<Mentoring.MentoringStatus> status = createEnum("status", Mentoring.MentoringStatus.class);

    public QMentoring(String variable) {
        this(Mentoring.class, forVariable(variable), INITS);
    }

    public QMentoring(Path<? extends Mentoring> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMentoring(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMentoring(PathMetadata metadata, PathInits inits) {
        this(Mentoring.class, metadata, inits);
    }

    public QMentoring(Class<? extends Mentoring> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.mentor = inits.isInitialized("mentor") ? new codi.backend.domain.mentor.entity.QMentor(forProperty("mentor"), inits.get("mentor")) : null;
        this.profile = inits.isInitialized("profile") ? new codi.backend.domain.profile.entity.QProfile(forProperty("profile"), inits.get("profile")) : null;
        this.schedule = inits.isInitialized("schedule") ? new codi.backend.domain.schedule.entity.QSchedule(forProperty("schedule"), inits.get("schedule")) : null;
    }

}

