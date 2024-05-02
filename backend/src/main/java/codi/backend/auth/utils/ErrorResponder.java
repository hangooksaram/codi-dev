package codi.backend.auth.utils;

import codi.backend.global.response.ErrorResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ErrorResponder {
    public static void sendErrorResponse(HttpServletResponse response, HttpStatus status, String path, String detailedMessage) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        ErrorResponse errorResponse = ErrorResponse.of(status.value(), status.getReasonPhrase(), path, detailedMessage);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8");
        response.setStatus(status.value());
        response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
    }
}
