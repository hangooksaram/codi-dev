package codi.backend.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    // Member, Account
    MEMBER_NOT_FOUND(404, "Member not found"),
    INVALID_INPUT(400, "Invalid input provided"),
    SERVER_ERROR(500, "An error occurred on the server"),
    SAME_PASSWORD_ERROR(409, "Same password error, please enter a different password"),
    INVALID_OLD_PASSWORD(401, "Invalid current password error, please enter the correct password"),
    NOT_MENTOR_ERROR(403, "Forbidden. The requested member is not a mentor."),
    NOT_PROFILE_ERROR(400, "This member has no profile"),
    PROFILE_NOT_FOUND(400, "This request does not have profile obj"),
    PROFILE_UPDATE_FAILED(500, "Profile update failed"),
    DUPLICATED_ID(400, "ID is already in use."),
    DUPLICATE_EMAIL(400, "Email is already in use."),

    // File
    INVALID_DIRECTORY_NAME(400, "This directory name is invalid"),
    NOT_FILE_ERROR(400, "This is not a file"),
    INVALID_FILE_TYPE(400, "Invalid or unsupported file type"),
    FILE_WRITE_ERROR(400, "Failed to write resized image"),
    INVALID_FILE(400, "File cannot be null or empty."),
    FILE_UPDATE_FAILED(500, "File update failed"),
    FILE_UPLOAD_ERROR(500, "File upload failed"),

    // Profile
    ALREADY_EXISTS(409, "This mentor is already in favorites"),

    // Favorite
    FAVORITE_NOT_FOUND(404, "Favorite not found"),
    CANNOT_FAVORITE_SELF(422, "You cannot add yourself as a favorite."),

    // schdule
    SCHEDULE_NOT_FOUND(404, "Schedule not found"),
    MENTORING_ALREADY_EXIST(400, "Schedule's mentoring is already exist"),
    START_TIME_AFTER_END_TIME_ERROR(400, "The start time must be earlier than the end time. "),
    SCHEDULE_ALREADY_EXISTS_ERROR(400, "A schedule already exists for that time slot.");

    @Getter
    private final int status;

    @Getter
    private final String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
