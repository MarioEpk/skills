package com.skillsmanagerapi.controllers;

import com.skillsmanagerapi.dto.CertificateDto;
import com.skillsmanagerapi.dto.CvDto;
import com.skillsmanagerapi.dto.LanguageDto;
import com.skillsmanagerapi.dto.OtherDto;
import com.skillsmanagerapi.dto.ProjectDto;
import com.skillsmanagerapi.dto.SkillDto;
import com.skillsmanagerapi.dto.TechnologyDto;
import com.skillsmanagerapi.dto.UserByGoogleDto;
import com.skillsmanagerapi.dto.UserDto;
import com.skillsmanagerapi.models.Project;
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

    // Language
    @RequestMapping(value = "/{id}/language", method = RequestMethod.POST)
    public void addLanguageToCv(@RequestBody LanguageDto languageDto, @PathVariable("id") int id) {
        cvService.addLanguageToCv(id, languageDto);
    }

    @RequestMapping(value = "/language", method = RequestMethod.PUT)
    public void updateLanguage(@RequestBody LanguageDto languageDto) {
        cvService.updateLanguage(languageDto);
    }

    @RequestMapping(value = "/language/{id}", method = RequestMethod.DELETE)
    public void removeLanguageFromCv(@PathVariable("id") int id) {
        cvService.removeLanguageFromCv(id);
    }

    // Skill
    @RequestMapping(value = "/{id}/skill", method = RequestMethod.POST)
    public void addSkillToCv(@RequestBody SkillDto skillDto, @PathVariable("id") int id) {
        cvService.addSkillToCv(id, skillDto);
    }

    @RequestMapping(value = "/skill", method = RequestMethod.PUT)
    public void updateSkill(@RequestBody SkillDto skillDto) {
        cvService.updateSkill(skillDto);
    }

    @RequestMapping(value = "/skill/{id}", method = RequestMethod.DELETE)
    public void removeSkillFromCv(@PathVariable("id") int id) {
        cvService.removeSkillFromCv(id);
    }

    // Project
    @RequestMapping(value = "/{id}/project", method = RequestMethod.POST)
    public void addProjectToCv(@RequestBody ProjectDto projectDto, @PathVariable("id") int id) {
        cvService.addProjectToCv(id, projectDto);
    }

    @RequestMapping(value = "/project", method = RequestMethod.PUT)
    public void updateProject(@RequestBody ProjectDto projectDto) {
        cvService.updateProject(projectDto);
    }

    @RequestMapping(value = "/project/{id}", method = RequestMethod.DELETE)
    public void removeProjectFromCv(@PathVariable("id") int id) {
        cvService.removeProjectFromCv(id);
    }

    // Technology
    @RequestMapping(value = "/{id}/technology", method = RequestMethod.POST)
    public void addTechnologyToCv(@RequestBody TechnologyDto technologyDto, @PathVariable("id") int id) {
        cvService.addTechnologyToCv(id, technologyDto);
    }

    @RequestMapping(value = "/technology", method = RequestMethod.PUT)
    public void updateTechnology(@RequestBody TechnologyDto technologyDto) {
        cvService.updateTechnology(technologyDto);
    }

    @RequestMapping(value = "/technology/{id}", method = RequestMethod.DELETE)
    public void removeTechnologyFromCv(@PathVariable("id") int id) {
        cvService.removeTechnologyFromCv(id);
    }

    // Certificate
    @RequestMapping(value = "/{id}/certificate", method = RequestMethod.POST)
    public void addCertificateToCv(@RequestBody CertificateDto certificateDto, @PathVariable("id") int id) {
        cvService.addCertificateToCv(id, certificateDto);
    }

    @RequestMapping(value = "/certificate", method = RequestMethod.PUT)
    public void updateCertificate(@RequestBody CertificateDto certificateDto) {
        cvService.updateCertificate(certificateDto);
    }

    @RequestMapping(value = "/certificate/{id}", method = RequestMethod.DELETE)
    public void removeCertificateFromCv(@PathVariable("id") int id) {
        cvService.removeCertificateFromCv(id);
    }

    // Other
    @RequestMapping(value = "/{id}/other", method = RequestMethod.POST)
    public void addOtherToCv(@RequestBody OtherDto otherDto, @PathVariable("id") int id) {
        cvService.addOtherToCv(id, otherDto);
    }

    @RequestMapping(value = "/other", method = RequestMethod.PUT)
    public void updateOther(@RequestBody OtherDto otherDto) {
        cvService.updateOther(otherDto);
    }

    @RequestMapping(value = "/other/{id}", method = RequestMethod.DELETE)
    public void removeOtherFromCv(@PathVariable("id") int id) {
        cvService.removeOtherFromCv(id);
    }
}
