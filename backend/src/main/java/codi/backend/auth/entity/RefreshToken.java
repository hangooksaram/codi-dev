package codi.backend.auth.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "new_refresh_token")
public class RefreshToken {
    @Id
    @Column(unique = true)
    @NotNull
    private Long memberId;

    @Column(unique = true)
    @NotNull
    private String email;

    @NotNull
    private String refreshToken;

    private Date expiryDate;
}
