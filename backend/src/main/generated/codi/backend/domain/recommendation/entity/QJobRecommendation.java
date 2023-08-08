package codi.backend.domain.recommendation.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QJobRecommendation is a Querydsl query type for JobRecommendation
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QJobRecommendation extends EntityPathBase<JobRecommendation> {

    private static final long serialVersionUID = 451597325L;

    public static final QJobRecommendation jobRecommendation = new QJobRecommendation("jobRecommendation");

    public final NumberPath<Integer> age = createNumber("age", Integer.class);

    public final StringPath disability = createString("disability");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath job = createString("job");

    public final StringPath severity = createString("severity");

    public QJobRecommendation(String variable) {
        super(JobRecommendation.class, forVariable(variable));
    }

    public QJobRecommendation(Path<? extends JobRecommendation> path) {
        super(path.getType(), path.getMetadata());
    }

    public QJobRecommendation(PathMetadata metadata) {
        super(JobRecommendation.class, metadata);
    }

}

