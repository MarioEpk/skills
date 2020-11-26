package com.skillsmanagerapi.configs;

import com.skillsmanagerapi.utils.RoleConverter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimValidator;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;

import java.util.List;

import lombok.NonNull;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${security.jwt.issuer-uri}")
    private String issuerUri;

    @Value("${security.jwt.validate.iss}")
    private String validIss;

    @Value("${security.jwt.validate.aud}")
    private String validAud;

    private final RoleConverter roleConverter;

    @Autowired
    public SecurityConfig(@NonNull final RoleConverter roleConverter) {
        this.roleConverter = roleConverter;
    }

    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(roleConverter);

        return jwtAuthenticationConverter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
       http
           .authorizeRequests()
                .anyRequest()
                    .authenticated()
           .and()
                .oauth2ResourceServer()
                    .jwt()
                        .jwtAuthenticationConverter(jwtAuthenticationConverter())
                .and()
           .and()
                .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
           .and()
                .cors()
           .and()
               .csrf()
                    .disable();
    }

    @Bean
    public NimbusJwtDecoder jwtDecoder() {
        final NimbusJwtDecoder jwtDecoder = (NimbusJwtDecoder) JwtDecoders.fromOidcIssuerLocation(issuerUri);
        final OAuth2TokenValidator<Jwt> defaultWithIssuer = JwtValidators.createDefaultWithIssuer(validIss);
        final JwtClaimValidator<List<String>> withAudience = new JwtClaimValidator<>("aud", aud -> aud.contains(validAud));
        final OAuth2TokenValidator<Jwt> validator = new DelegatingOAuth2TokenValidator<>(defaultWithIssuer, withAudience);
        jwtDecoder.setJwtValidator(validator);

        return jwtDecoder;
    }
}
