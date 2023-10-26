package codi.backend.global.config;

import codi.backend.auth.filter.JwtAuthenticationFilter;
import codi.backend.auth.filter.JwtVerificationFilter;
import codi.backend.auth.handler.CustomAccessDeniedHandler;
import codi.backend.auth.handler.CustomAuthenticationEntryPoint;
import codi.backend.auth.handler.CustomAuthenticationFailureHandler;
import codi.backend.auth.handler.CustomAuthenticationSuccessHandler;
import codi.backend.auth.jwt.JwtTokenizer;
import codi.backend.auth.service.AuthService;
import codi.backend.auth.utils.CustomAuthorityUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
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
                        .antMatchers(HttpMethod.GET, "/api/v1/schedule/**").hasRole("MENTOR")

                        .anyRequest().permitAll()
                );
        return http.build();
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
            jwtAuthenticationFilter.setFilterProcessesUrl("/api/v1/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new CustomAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new CustomAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer);

            builder
                    .addFilter(jwtAuthenticationFilter) // Spring Security 필터에 추가
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class); // 인증 이후 verification 검증
        }
    }
}
