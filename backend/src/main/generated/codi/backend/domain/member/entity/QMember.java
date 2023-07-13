package codi.backend.domain.member.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = -1437246492L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMember member = new QMember("member1");

    public final StringPath birth = createString("birth");

    public final StringPath email = createString("email");

    public final EnumPath<Member.Gender> gender = createEnum("gender", Member.Gender.class);

    public final StringPath id = createString("id");

    public final codi.backend.domain.mentor.entity.QMentor mentor;

    public final StringPath name = createString("name");

    public final StringPath password = createString("password");

    public final codi.backend.domain.profile.entity.QProfile profile;

    public final ListPath<String, StringPath> roles = this.<String, StringPath>createList("roles", String.class, StringPath.class, PathInits.DIRECT2);

    public QMember(String variable) {
        this(Member.class, forVariable(variable), INITS);
    }

    public QMember(Path<? extends Member> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMember(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMember(PathMetadata metadata, PathInits inits) {
        this(Member.class, metadata, inits);
    }

    public QMember(Class<? extends Member> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.mentor = inits.isInitialized("mentor") ? new codi.backend.domain.mentor.entity.QMentor(forProperty("mentor"), inits.get("mentor")) : null;
        this.profile = inits.isInitialized("profile") ? new codi.backend.domain.profile.entity.QProfile(forProperty("profile"), inits.get("profile")) : null;
    }

}

