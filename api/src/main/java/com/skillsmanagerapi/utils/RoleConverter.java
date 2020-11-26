package com.skillsmanagerapi.utils;

import com.skillsmanagerapi.enums.RoleTypes;
import com.skillsmanagerapi.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.oidc.StandardClaimNames;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Collections;

import lombok.NonNull;

@Component
public class RoleConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

    private final UserRepository userRepository;

    @Autowired
    public RoleConverter(@NonNull final UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Collection<GrantedAuthority> convert(@NonNull final Jwt jwt) {
        final String email = (String) jwt.getClaims().get(StandardClaimNames.EMAIL);
        final var user = userRepository.findByEmail(email);
        // new user won't be present in db
        if (user.isPresent()) {
            String roleName;
            if(user.get().getRole() == null) {
                roleName = RoleTypes.USER.getName();
            } else {
                roleName = user.get().getRole().getName();
            }
            final SimpleGrantedAuthority authority = new SimpleGrantedAuthority(roleName);

            return Collections.singletonList(authority);
        } else {
            return Collections.emptyList();
        }
    }
}
