package codi.backend.domain.profile.entity;

import codi.backend.domain.favorite.entity.Favorite;
import codi.backend.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PROFILE_ID")
    private Long id;

    @Column
    private String imgUrl;

    @Column
    private String desiredJob;

    @Column
    private String education;

    @Column
    private String disability;

    @Column
    private String severity;

    @Column
    private String introduction;

    @OneToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Favorite> favorites = new HashSet<>();

    public void addFavorite(Favorite favorite) {
        this.favorites.add(favorite);
        favorite.setProfile(this);
    }

    public void removeFavorite(Favorite favorite) {
        this.favorites.remove(favorite);
        favorite.setProfile(null);
    }

    @Builder
    public Profile(Long id, String imgUrl, String desiredJob, String education, String disability, String severity, String introduction, Set<Favorite> favorites) {
        this.id = id;
        this.imgUrl = imgUrl;
        this.desiredJob = desiredJob;
        this.education = education;
        this.disability = disability;
        this.severity = severity;
        this.introduction = introduction;
        this.favorites = favorites;
    }

    public void setMember(Member member) {
        this.member = member;
    }
}
