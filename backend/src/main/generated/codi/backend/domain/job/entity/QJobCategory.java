package codi.backend.domain.job.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QJobCategory is a Querydsl query type for JobCategory
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QJobCategory extends EntityPathBase<JobCategory> {

    private static final long serialVersionUID = -369418156L;

    public static final QJobCategory jobCategory = new QJobCategory("jobCategory");

    public final StringPath classification = createString("classification");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final ListPath<Job, QJob> jobs = this.<Job, QJob>createList("jobs", Job.class, QJob.class, PathInits.DIRECT2);

    public QJobCategory(String variable) {
        super(JobCategory.class, forVariable(variable));
    }

    public QJobCategory(Path<? extends JobCategory> path) {
        super(path.getType(), path.getMetadata());
    }

    public QJobCategory(PathMetadata metadata) {
        super(JobCategory.class, metadata);
    }

}

