package codi.backend.auth.handler;

import codi.backend.auth.utils.ErrorResponder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        String detailedMessage = "접근 권한이 없습니다. 요청할 작업에 대한 권한을 확인하세요.";
        ErrorResponder.sendErrorResponse(response, HttpStatus.FORBIDDEN, request.getRequestURI(), detailedMessage);
        log.warn("Forbidden error happened: {}", accessDeniedException.getMessage());
    }
}
