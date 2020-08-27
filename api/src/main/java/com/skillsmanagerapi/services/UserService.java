package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.UserByGoogleDto;
import com.skillsmanagerapi.dto.UserDto;
import com.skillsmanagerapi.models.User;
import com.skillsmanagerapi.repositories.UserRepository;
import com.skillsmanagerapi.util.ModelMapperUtil;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final ModelMapperUtil modelMapperUtil;

    @Autowired
    public UserService(UserRepository userRepository, ModelMapper modelMapper, ModelMapperUtil modelMapperUtil) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.modelMapperUtil = modelMapperUtil;
    }

    public List<UserDto> getAllUsers() {
        return modelMapperUtil.mapList(userRepository.findAllByOrderByIdAsc(), UserDto.class);
    }

    public UserDto getUserOrCreateNew(UserByGoogleDto userByGoogleDto) {
        User user = userRepository.findByGoogleEmail(userByGoogleDto.getEmail()).orElseGet(() -> createUser(userByGoogleDto));
        return modelMapper.map(user, UserDto.class);
    }

    public UserDto getUserOrCreateNew(UserDto userDto) {
        User user = userRepository.findByGoogleEmail(userDto.getGoogleEmail()).orElseGet(() -> createSimpleUser(userDto));
        return modelMapper.map(user, UserDto.class);    }

    private User createUser(UserByGoogleDto userByGoogleDto) {
        User user = new User();
        user.setGoogleId(userByGoogleDto.getGoogleId());
        user.setGoogleEmail(userByGoogleDto.getEmail());
        user.setFirstName(userByGoogleDto.getFirstName());
        user.setLastName(userByGoogleDto.getLastName());
        userRepository.save(user);
        return user;
    }

    private User createSimpleUser(UserDto userDto) {
        User user = new User();
        user.setGoogleEmail(userDto.getGoogleEmail());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        userRepository.save(user);
        return user;
    }

}
