package codi.backend.auth.entity;

import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Setter
public class RefreshToken {
    @Id
    @Column(unique = true)
    @NotNull
    private String memberId;

    @NotNull
    private String refreshToken;

    private Date expiryDate;

    public String getMemberId() {
        return memberId;
    }

    public Date getExpiryDate() {
        return expiryDate;
    }
}
