package codi.backend.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    /**
     * Override this method to add cross origin requests mappings to the registry.
     *
     * @param registry CORS registry
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 요청 경로에 대해
                .allowedOrigins("http://localhost:3000", "http://localhost:8080") // http://localhost:3000 의 출처가 허용된 요청
                .allowedMethods("*") // 모든 HTTP 메서드 요청을 허용 (GET, POST, PUT, DELETE 등)
                .allowedHeaders("*") // 모든 헤더의 요청을 허용
                .allowCredentials(true) // 쿠키 전송 허용
                .exposedHeaders("*") // 사용자 정의 헤더를 응답에 포함
                .maxAge(3600); // 사전 전달 요청(Preflight request)의 캐시 시간을 1시간으로 설정
    }
}
