package com.skillsmanagerapi.configs;

import com.skillsmanagerapi.enums.RoleTypes;
import com.skillsmanagerapi.models.Role;
import com.skillsmanagerapi.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.oidc.StandardClaimNames;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import lombok.NonNull;

@Component
public class RoleConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

    private final UserRepository userRepository;

    @Autowired
    public RoleConverter(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Collection<GrantedAuthority> convert(@NonNull Jwt jwt) {
        String email = (String) jwt.getClaims().get(StandardClaimNames.EMAIL);
        var user = userRepository.findByEmail(email);
        // new user won't be present in db
        if (user.isPresent()) {
            List<Role> roles = new ArrayList<>();
            if(user.get().getRole() == null) {
                var defaultRole = new Role();
                defaultRole.setName(RoleTypes.user);
                roles.add(defaultRole);
            } else {
                roles.add(user.get().getRole());
            }
            return roles.stream()
                    .map(Role::getName)
                    .map(roleName -> new SimpleGrantedAuthority(roleName.name()))
                    .collect(Collectors.toList());
        } else {
            return new ArrayList<>();
        }
    }
}
