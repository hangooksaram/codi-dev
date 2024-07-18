package codi.backend.domain.member.service;

public interface AccountService {
    boolean checkEmailDuplication(String email);
    void findId(String email);
    void findPw(String email);
}
