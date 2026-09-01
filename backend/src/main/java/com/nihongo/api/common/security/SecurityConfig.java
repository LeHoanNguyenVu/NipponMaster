package com.nihongo.api.common.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Cấu hình bảo mật cho toàn bộ ứng dụng.
 * Tích hợp JWT filter để bảo vệ các API cần đăng nhập.
 */
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth
                        // Các endpoint công khai (không cần đăng nhập)
                        .requestMatchers("/api/v1/auth/**").permitAll()
                        .requestMatchers("/api/v1/public/**").permitAll()

                        // Swagger UI
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**",
                                "/v3/api-docs.yaml"
                        ).permitAll()

                        // Cho phép GET public cho Vocabulary, Kanji, Grammar, Quick Practice (tra cứu không cần login)
                        .requestMatchers(HttpMethod.GET, "/api/v1/vocabularies/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/kanjis/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/grammars/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/flashcards/quick-practice").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/flashcards/quick-practice/**").permitAll()
                        .requestMatchers("/api/v1/tts/**").permitAll()

                        // Cho phép xem cấu trúc đề thi (không cần login, submit thì cần)
                        .requestMatchers(HttpMethod.GET, "/api/v1/placement-test/questions").permitAll()

                        // Cho phép xem danh sách gói học (public pricing) và webhook thanh toán & trial status
                        .requestMatchers(HttpMethod.GET, "/api/v1/subscriptions/plans").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/subscriptions/trial-status").permitAll()
                        .requestMatchers("/api/v1/payments/webhook").permitAll()

                        // Cho phép xem danh sách kịch bản Speaking & Listening
                        .requestMatchers(HttpMethod.GET, "/api/v1/speaking/scenarios").permitAll()
                        .requestMatchers("/api/v1/listening/**").permitAll()

                        // Cho phép thử nghiệm vẽ Kanji Canvas & OCR
                        .requestMatchers("/api/v1/kanjis/canvas/**").permitAll()

                        // Cho phép phân tích cú pháp câu AI
                        .requestMatchers("/api/v1/sentence-breakdown/**").permitAll()

                        // Endpoints Admin Dashboard & Consoles
                        .requestMatchers("/api/v1/admin/**").permitAll()

                        // Tất cả endpoint còn lại yêu cầu đăng nhập
                        .anyRequest().authenticated()
                )
                // Thêm JWT filter trước UsernamePasswordAuthenticationFilter
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
