package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.UserDto;
import com.skillsmanagerapi.enums.RoleTypes;
import com.skillsmanagerapi.models.Role;
import com.skillsmanagerapi.models.User;
import com.skillsmanagerapi.repositories.UserRepository;
import com.skillsmanagerapi.utils.ModelMapperUtil;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.oidc.StandardClaimNames;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final ModelMapperUtil modelMapperUtil;
    private final JwtDecoder jwtDecoder;

    @Autowired
    public UserService(
        @NonNull final UserRepository userRepository,
        @NonNull final ModelMapper modelMapper,
        @NonNull final ModelMapperUtil modelMapperUtil,
        @NonNull final JwtDecoder jwtDecoder
    ) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.modelMapperUtil = modelMapperUtil;
        this.jwtDecoder = jwtDecoder;
    }

    public List<UserDto> getAllUsers() {
        return modelMapperUtil.mapList(userRepository.findAllByOrderByIdAsc(), UserDto.class);
    }

    @Transactional
    public UserDto getUserOrCreateNew(@NonNull final UserDto userDto) {
        final User user = userRepository.findByEmail(userDto.getEmail()).orElseGet(() -> createUser(userDto));
        return modelMapper.map(user, UserDto.class);    }

    public UserDto getUserFromToken(@NonNull final String token) {
        // Remove Bearer string from start
        final Jwt jwt = jwtDecoder.decode(token.substring(7));
        final String email = (String) jwt.getClaims().get(StandardClaimNames.EMAIL);
        final User user = userRepository.findByEmail(email).orElseThrow(EntityNotFoundException::new);

        return modelMapper.map(user, UserDto.class);
    }

    public UserDto getUserById(final int userId) {
        final User user = userRepository.findById(userId).orElseThrow(EntityNotFoundException::new);
        return modelMapper.map(user, UserDto.class);
    }

    @Transactional
    public void updateUser(@NonNull final UserDto userDto) {
        final UserDto updatedUserDto = modelMapper.map(userRepository.findById(userDto.getId()).orElseThrow(EntityNotFoundException::new), UserDto.class);
        updatedUserDto.setFirstName(userDto.getFirstName());
        updatedUserDto.setLastName(userDto.getLastName());
        updatedUserDto.setRole(userDto.getRole());
        userRepository.save(modelMapper.map(updatedUserDto, User.class));
    }

    private User createUser(@NonNull final UserDto userDto) {
        log.info("Creating user {}", userDto.getEmail());
        final User user = new User();
        user.setGoogleId(userDto.getGoogleId());
        user.setEmail(userDto.getEmail());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        final Role role = new Role();
        role.setId(RoleTypes.USER.getId());
        user.setRole(role);
        userRepository.save(user);

        return user;
    }
}
