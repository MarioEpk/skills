package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.UserDto;
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

@Service
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final ModelMapperUtil modelMapperUtil;
    private final JwtDecoder jwtDecoder;

    @Autowired
    public UserService(UserRepository userRepository, ModelMapper modelMapper, ModelMapperUtil modelMapperUtil, JwtDecoder jwtDecoder) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.modelMapperUtil = modelMapperUtil;
        this.jwtDecoder = jwtDecoder;
    }

    public List<UserDto> getAllUsers() {
        return modelMapperUtil.mapList(userRepository.findAllByOrderByIdAsc(), UserDto.class);
    }

    public UserDto getUserOrCreateNew(UserDto userDto) {
        User user = userRepository.findByEmail(userDto.getEmail()).orElseGet(() -> createUser(userDto));
        return modelMapper.map(user, UserDto.class);    }

    public UserDto getUserFromToken(String token) {
        // Remove Bearer string from start
        Jwt jwt = jwtDecoder.decode(token.substring(7));
        String email = (String) jwt.getClaims().get(StandardClaimNames.EMAIL);

        User user = userRepository.findByEmail(email).orElseThrow(EntityNotFoundException::new);
        return modelMapper.map(user, UserDto.class);
    }

    public UserDto getUserById(Integer userId) {
        User user = userRepository.findById(userId).orElseThrow(EntityNotFoundException::new);
        return modelMapper.map(user, UserDto.class);
    }

    public void updateUser(UserDto userDto) {
        UserDto updatedUserDto = modelMapper.map(userRepository.findById(userDto.getId()).orElseThrow(EntityNotFoundException::new), UserDto.class);
        updatedUserDto.setFirstName(userDto.getFirstName());
        updatedUserDto.setLastName(userDto.getLastName());
        updatedUserDto.setRole(userDto.getRole());
        userRepository.save(modelMapper.map(updatedUserDto, User.class));
    }

    private User createUser(UserDto userDto) {
        User user = new User();
        user.setGoogleId(userDto.getGoogleId());
        user.setEmail(userDto.getEmail());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        Role role = new Role();
        // TODO :: ID 3 is for user privileges - add better role selection
        role.setId(3);
        user.setRole(role);
        userRepository.save(user);
        return user;
    }
}
