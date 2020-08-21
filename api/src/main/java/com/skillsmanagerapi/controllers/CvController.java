package com.skillsmanagerapi.controllers;

import com.skillsmanagerapi.dto.CvDto;
import com.skillsmanagerapi.dto.UserByGoogleDto;
import com.skillsmanagerapi.dto.UserDto;
import com.skillsmanagerapi.services.CvService;
import com.skillsmanagerapi.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping(value = "/cv")
@RestController
public class CvController {

    private final UserService userService;
    private final CvService cvService;

    @Autowired
    public CvController(UserService userService, CvService cvService) {
        this.userService = userService;
        this.cvService = cvService;
    }

    @RequestMapping(value = "/process", method = RequestMethod.POST)
    public CvDto processUser(@RequestBody UserByGoogleDto userByGoogleDto) {
        UserDto userDto = userService.getUserOrCreateNew(userByGoogleDto);
        return cvService.getCvOrCreateNew(userDto);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<CvDto> getAllLanguageTypes() {
        return cvService.getAllCvs();
    }

    @RequestMapping(method = RequestMethod.PUT)
    public void createCv(@RequestBody UserDto userDto) {
        UserDto currentUser = userService.getUserOrCreateNew(userDto);
        cvService.getCvOrCreateNew(currentUser);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteLanguageType(@PathVariable("id") int id) {
        cvService.deleteCv(id);
    }

}
