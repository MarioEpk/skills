package com.skillsmanagerapi.configs

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator
import org.springframework.security.oauth2.core.OAuth2TokenValidator
import org.springframework.security.oauth2.jwt.*
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter
import java.util.function.Predicate
import kotlin.jvm.Throws


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
open class SecurityConfig : WebSecurityConfigurerAdapter() {
    @Value("\${security.jwt.issuer-uri}")
    private val issuerUri: String? = null

    @Value("\${security.jwt.validate.iss}")
    private val validIss: String? = null

    @Value("\${security.jwt.validate.aud}")
    private val validAud: String? = null

    @Autowired
    lateinit var roleConverter: RoleConverter

    open fun jwtAuthenticationConverter(): JwtAuthenticationConverter? {
        val jwtAuthenticationConverter = JwtAuthenticationConverter()
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(roleConverter)
        return jwtAuthenticationConverter
    }

    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        http
            .authorizeRequests()
            .antMatchers("/public/**").permitAll()
            .anyRequest()
            .authenticated()
            .and()
            .oauth2ResourceServer()
            .jwt()
            .jwtAuthenticationConverter(jwtAuthenticationConverter())
            .and().and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .cors()
            .and()
            .csrf()
            .disable()

    }

    @Bean
    open fun jwtDecoder(): JwtDecoder {
        val jwtDecoder = JwtDecoders.fromOidcIssuerLocation(issuerUri) as NimbusJwtDecoder
        // https://github.com/google/google-api-javascript-client/issues/512
        val defaultWithIssuer = JwtValidators.createDefaultWithIssuer(validIss)
        val withAudience = JwtClaimValidator("aud", Predicate { aud: List<String?> -> aud.contains(validAud) })
        val validator: OAuth2TokenValidator<Jwt> = DelegatingOAuth2TokenValidator(defaultWithIssuer, withAudience)
        jwtDecoder.setJwtValidator(validator)
        return jwtDecoder
    }
}
