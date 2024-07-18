package codi.backend.global.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    // Member, Account
    MEMBER_NOT_FOUND(404, "Member not found."),
    INVALID_INPUT(400, "Invalid input provided."),
    SERVER_ERROR(500, "An error occurred on the server."),
    SAME_PASSWORD_ERROR(409, "Same password error, please enter a different password."),
    INVALID_OLD_PASSWORD(401, "Invalid current password error, please enter the correct password."),
    NOT_MENTOR_ERROR(403, "Forbidden. The requested member is not a mentor."),
    NOT_PROFILE_ERROR(400, "This member has no profile."),
    PROFILE_NOT_FOUND(400, "This request does not have profile obj."),
    PROFILE_UPDATE_FAILED(500, "Profile update failed."),
    DUPLICATED_ID(400, "ID is already in use."),
    DUPLICATE_EMAIL(400, "Email is already in use."),
    INVALID_PASSWORD(400, "Password is not valid."),
    MENTOR_EXIST(400, "You are already mentor."),
    PROFILE_EXIST(400, "You already have profile."),

    // File
    INVALID_DIRECTORY_NAME(400, "This directory name is invalid."),
    NOT_FILE_ERROR(400, "This is not a file."),
    INVALID_FILE_TYPE(400, "Invalid or unsupported file type."),
    FILE_WRITE_ERROR(400, "Failed to write resized image."),
    INVALID_FILE(400, "File cannot be null or empty."),
    FILE_UPDATE_FAILED(500, "File update failed."),
    FILE_UPLOAD_ERROR(500, "File upload failed."),

    // Profile
    ALREADY_EXISTS(409, "This mentor is already in favorites."),

    // Favorite
    FAVORITE_NOT_FOUND(404, "Favorite not found."),
    CANNOT_FAVORITE_SELF(422, "You cannot add yourself as a favorite."),

    // Schedule
    SCHEDULE_NOT_FOUND(404, "Schedule not found."),
    MENTORING_ALREADY_EXIST(400, "Schedule's mentoring is already exist"),
    START_TIME_AFTER_END_TIME_ERROR(400, "The start time must be earlier than the end time. "),
    SCHEDULE_ALREADY_EXISTS_ERROR(400, "A schedule already exists for that time slot."),

    // mentoring
    MENTORING_NOT_FOUND(404, "Mentoring not found."),
    NOT_YOUR_MENTORING(404, "This mentoring is not yours."),
    MENTORING_NOT_APPLICATION(400, "Mentoring status is not application"),
    MENTORING_NOT_ACCEPTED(400, "Mentoring status is not accepted."),
    INVALID_STAR_VALUE(400, "Star value must be between 0 and 5."),
    MENTOR_MISMATCH(404, "Mentor ID does not match with the mentoring's mentor."),
    ALREADY_RATED_MENTORING(400, "This Mentoring is already rated."),
    SELF_MENTORING_REQUEST(400, "Mentee and Mentor can't be the same person."),

    // Auth
    REFRESH_TOKEN_NOT_FOUND(404, "Refresh Token not found."),
    REFRESH_TOKEN_EXPIRED(401, "Refresh Token expired."),
    ACCESS_TOKEN_EXPIRED(401, "Access Token expired");

    private final int status;

    private final String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
