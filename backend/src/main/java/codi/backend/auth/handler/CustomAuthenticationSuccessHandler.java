package codi.backend.auth.handler;

import codi.backend.auth.userdetails.CustomUserDetails;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        log.info("# Authentication Success!");

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        createResponse(response, userDetails);
    }

    private void createResponse(HttpServletResponse response, CustomUserDetails userDetails) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();

        ObjectNode json = objectMapper.createObjectNode();
        json.put("id", userDetails.getId());
        json.put("isProfile", userDetails.getProfileId() != null);
        json.put("isMentor", userDetails.getMentorId() != null);

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(json.toString());
    }
}
