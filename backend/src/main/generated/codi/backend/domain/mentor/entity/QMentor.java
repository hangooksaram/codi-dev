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

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath inOffice = createBoolean("inOffice");

    public final StringPath introduction = createString("introduction");

    public final BooleanPath isCertificate = createBoolean("isCertificate");

    public final StringPath job = createString("job");

    public final codi.backend.domain.member.entity.QMember member;

    public final NumberPath<Integer> mentees = createNumber("mentees", Integer.class);

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

