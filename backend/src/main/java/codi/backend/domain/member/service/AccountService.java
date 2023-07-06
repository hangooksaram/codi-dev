package codi.backend.domain.member.service;

public interface AccountService {
    // GET
    boolean checkIdDuplication(String id);
    boolean checkEmailDuplication(String email);

    // POST
    void findId(String email);
    void findPw(String id, String email);
}
