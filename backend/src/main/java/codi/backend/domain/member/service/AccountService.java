package codi.backend.domain.member.service;

public interface AccountService {
    boolean checkIdDuplication(String id);
    boolean checkEmailDuplication(String email);
    void findId(String email);
    void findPw(String id, String email);
}
