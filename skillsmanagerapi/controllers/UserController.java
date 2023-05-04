package com.skillsmanagerapi.controllers;

import com.skillsmanagerapi.dto.UserCertificateDto;
import com.skillsmanagerapi.dto.UserDto;
import com.skillsmanagerapi.dto.UserEducationDto;
import com.skillsmanagerapi.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RequestMapping(value = "/api/user")
@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("hasAnyAuthority('admin', 'business')")
    @GetMapping
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @PreAuthorize("hasAnyAuthority('admin', 'business')")
    @GetMapping("/certificate")
    public List<UserCertificateDto> getUsersWithCertificates() {
        return userService.getUsersWithCertificates();
    }

    @PreAuthorize("hasAnyAuthority('admin', 'business')")
    @GetMapping("/education")
    public List<UserEducationDto> getUsersWithEducations() {
        return userService.getUsersWithEducations();
    }
}
