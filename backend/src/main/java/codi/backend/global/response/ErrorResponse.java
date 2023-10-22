package codi.backend.global.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
public class ErrorResponse {
    private int status;
    private String message;
    private String timestamp;
    private String path;

    public static ErrorResponse of(int status, String message, String path) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.status = status;
        errorResponse.message = message;
        errorResponse.timestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        errorResponse.path = path;
        return errorResponse;
    }

    public static ErrorResponse of(int status, String message) {
        return of(status, message, null);
    }
}
