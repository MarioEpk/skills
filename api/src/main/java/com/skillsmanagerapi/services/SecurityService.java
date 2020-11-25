package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.CvDto;
import com.skillsmanagerapi.dto.UserDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

import lombok.NonNull;

@Service("securityService")
public class SecurityService {

    private final UserService userService;
    private final CvService cvService;

    @Autowired
    public SecurityService(@NonNull final UserService userService, @NonNull final CvService cvService) {
        this.userService = userService;
        this.cvService = cvService;
    }

    private UserDto getCurrentRequestUser() {
        // TODO :: find better way for getting current request attributes
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

        return userService.getUserFromToken(request.getHeader("Authorization"));
    }

    public boolean isOwnerOfCv(final int cvId) {
        try {
            final CvDto cvDto = cvService.getCv(cvId);
            return cvDto.getUser().getId() == this.getCurrentRequestUser().getId();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isOwnerOfCv(@NonNull final CvDto cvDto) {
        try {
            return cvDto.getUser().getId() == this.getCurrentRequestUser().getId();
        } catch (Exception e) {
            return false;
        }
    }
}
