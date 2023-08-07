package codi.backend.domain.profile.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QProfile is a Querydsl query type for Profile
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QProfile extends EntityPathBase<Profile> {

    private static final long serialVersionUID = 768997814L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QProfile profile = new QProfile("profile");

    public final StringPath desiredJob = createString("desiredJob");

    public final StringPath disability = createString("disability");

    public final StringPath education = createString("education");

    public final EnumPath<Profile.EmploymentStatus> employmentStatus = createEnum("employmentStatus", Profile.EmploymentStatus.class);

    public final SetPath<codi.backend.domain.favorite.entity.Favorite, codi.backend.domain.favorite.entity.QFavorite> favorites = this.<codi.backend.domain.favorite.entity.Favorite, codi.backend.domain.favorite.entity.QFavorite>createSet("favorites", codi.backend.domain.favorite.entity.Favorite.class, codi.backend.domain.favorite.entity.QFavorite.class, PathInits.DIRECT2);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath imgUrl = createString("imgUrl");

    public final StringPath introduction = createString("introduction");

    public final StringPath job = createString("job");

    public final codi.backend.domain.member.entity.QMember member;

    public final ListPath<codi.backend.domain.mentoring.entity.Mentoring, codi.backend.domain.mentoring.entity.QMentoring> mentoringList = this.<codi.backend.domain.mentoring.entity.Mentoring, codi.backend.domain.mentoring.entity.QMentoring>createList("mentoringList", codi.backend.domain.mentoring.entity.Mentoring.class, codi.backend.domain.mentoring.entity.QMentoring.class, PathInits.DIRECT2);

    public final StringPath severity = createString("severity");

    public QProfile(String variable) {
        this(Profile.class, forVariable(variable), INITS);
    }

    public QProfile(Path<? extends Profile> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QProfile(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QProfile(PathMetadata metadata, PathInits inits) {
        this(Profile.class, metadata, inits);
    }

    public QProfile(Class<? extends Profile> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new codi.backend.domain.member.entity.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

