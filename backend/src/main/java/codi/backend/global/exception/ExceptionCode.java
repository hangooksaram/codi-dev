package codi.backend.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    INVALID_INPUT(400, "Invalid input provided"),
    SERVER_ERROR(500, "An error occurred on the server"),
    SAME_PASSWORD_ERROR(409, "Same password error, please enter a different password"),
    INVALID_OLD_PASSWORD(401, "Invalid current password error, please enter the correct password"),
    NOT_MENTOR_ERROR(403, "Forbidden. The requested member is not a mentor."),
    NOT_PROFILE_ERROR(400, "This member has no profile");

    @Getter
    private final int status;

    @Getter
    private final String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
