package codi.backend.global.config;

import codi.backend.auth.filter.JwtAuthenticationFilter;
import codi.backend.auth.filter.JwtVerificationFilter;
import codi.backend.auth.handler.CustomAccessDeniedHandler;
import codi.backend.auth.handler.CustomAuthenticationEntryPoint;
import codi.backend.auth.handler.CustomAuthenticationFailureHandler;
import codi.backend.auth.handler.CustomAuthenticationSuccessHandler;
import codi.backend.auth.jwt.JwtTokenizer;
import codi.backend.auth.service.AuthService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private static final String HTTP_SERVER_DOMAIN = "http://codi-frontend.s3-website-ap-northeast-1.amazonaws.com";
    private static final String HTTPS_SERVER_DOMAIN = "https://www.codisabled.com";
    private static final String API_DOMAIN = "https://codisabled.com";
    private static final String LOCALHOST = "http://localhost:3000";
    private final JwtTokenizer jwtTokenizer;
    private final AuthService authService;

    public SecurityConfig(JwtTokenizer jwtTokenizer,  AuthService authService) {
        this.jwtTokenizer = jwtTokenizer;
        this.authService = authService;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().disable()
                .and()
                .csrf().disable()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new CustomAuthenticationEntryPoint())
                .accessDeniedHandler(new CustomAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeRequests(authorize -> authorize
                        // member
                        .antMatchers(HttpMethod.PATCH, "/api/v1/members").hasRole("MENTEE")
                        .antMatchers(HttpMethod.GET, "/api/v1/members").hasAnyRole("MENTEE", "ADMIN")

                        // profile(mentee), favorite
                        .antMatchers(HttpMethod.POST, "/api/v1/profiles/**").hasRole("MENTEE")
                        .antMatchers(HttpMethod.PATCH, "/api/v1/profiles/**").hasRole("MENTEE")
                        .antMatchers(HttpMethod.GET, "/api/v1/profiles/**").hasRole("MENTEE")
                        .antMatchers(HttpMethod.DELETE, "/api/v1/profiles/**").hasRole("MENTEE")

                        // mentor
                        .antMatchers(HttpMethod.POST, "/api/v1/mentors").hasRole("MENTEE")
                        .antMatchers(HttpMethod.PATCH, "/api/v1/mentors").hasRole("MENTOR")
                        .antMatchers(HttpMethod.GET, "/api/v1/mentors").hasRole("MENTOR")

                        // mentee's mentoring
                        .antMatchers(HttpMethod.POST, "/api/v1/mentees/**").hasRole("MENTEE")
                        .antMatchers(HttpMethod.PATCH, "/api/v1/mentees/**").hasRole("MENTEE")
                        .antMatchers(HttpMethod.GET, "/api/v1/mentees/**").hasRole("MENTEE")

                        // mentor's mentoring
                        .antMatchers(HttpMethod.PATCH, "/api/v1/mentors/mentoring").hasRole("MENTOR")
                        .antMatchers(HttpMethod.GET, "/api/v1/mentors/mentoring").hasRole("MENTOR")

                        // schedule
                        .antMatchers(HttpMethod.POST, "/api/v1/schedule").hasRole("MENTOR")
                        .antMatchers(HttpMethod.GET, "/api/v1/schedule/**").hasRole("MENTEE")

                        .anyRequest().permitAll()
                );
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(HTTP_SERVER_DOMAIN, HTTPS_SERVER_DOMAIN, API_DOMAIN, LOCALHOST));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"));
        config.setExposedHeaders(List.of("Refresh", "Authorization"));
        config.setAllowedHeaders(List.of("*"));
        config.addExposedHeader("*");
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, authService);
            jwtAuthenticationFilter.setFilterProcessesUrl("/api/v1/auth/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new CustomAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new CustomAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer);

            builder
                    .addFilter(jwtAuthenticationFilter) // Spring Security 필터에 추가
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class); // 인증 이후 verification 검증
        }
    }
}
