package com.skillsmanagerapi.controllers;

import com.skillsmanagerapi.dto.CvDto;
import com.skillsmanagerapi.dto.LanguageDto;
import com.skillsmanagerapi.dto.UserByGoogleDto;
import com.skillsmanagerapi.dto.UserDto;
import com.skillsmanagerapi.services.CvService;
import com.skillsmanagerapi.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
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

    @RequestMapping(value = "/my-id", method = RequestMethod.GET)
    public int getCvForCurrentUser(@RequestHeader("Authorization") String token) {
        UserDto userDto = userService.getUserFromToken(token);
        return cvService.getCvOrCreateNew(userDto).getId();
    }

    @RequestMapping(value = "/my", method = RequestMethod.POST)
    public CvDto process(@RequestBody UserByGoogleDto userByGoogleDto) {
        UserDto userDto = userService.getUserOrCreateNew(userByGoogleDto);
        return cvService.getCvOrCreateNew(userDto);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<CvDto> getAllCvs() {
        return cvService.getAllCvs();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public CvDto getCv(@PathVariable("id") int id) {
        return cvService.getCv(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public void createCv(@RequestBody UserDto userDto) {
        UserDto currentUser = userService.getUserOrCreateNew(userDto);
        cvService.getCvOrCreateNew(currentUser);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public void updateCv(@RequestBody CvDto cvDto) {
        cvService.updateCv(cvDto);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteCv(@PathVariable("id") int id) {
        cvService.deleteCv(id);
    }

    @RequestMapping(value = "/{id}/add-language", method = RequestMethod.POST)
    public void addLanguageToCv(@RequestBody LanguageDto languageDto, @PathVariable("id") int id) {
        cvService.addLanguageToCv(id, languageDto);
    }

    @RequestMapping(value = "/remove-language", method = RequestMethod.POST)
    public void removeLanguageFromCv(@RequestBody LanguageDto languageDto) {
        cvService.removeLanguageFromCv(languageDto);
    }
}
