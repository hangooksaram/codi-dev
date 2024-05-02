package codi.backend.auth.handler;

import codi.backend.global.response.ErrorResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
        log.error("# Authentication Failed: {}", exception.getMessage());
        createErrorResponse(request, response);
    }

    private void createErrorResponse(HttpServletRequest request, HttpServletResponse response) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        HttpStatus status = HttpStatus.UNAUTHORIZED;
        ErrorResponse errorResponse = ErrorResponse.of(status.value(), status.getReasonPhrase(), request.getRequestURI());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(status.value());
        response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
    }
}
