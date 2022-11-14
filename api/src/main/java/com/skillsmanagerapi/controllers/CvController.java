package com.skillsmanagerapi.controllers;

import com.skillsmanagerapi.dto.AllTypesDto;
import com.skillsmanagerapi.dto.CertificateDto;
import com.skillsmanagerapi.dto.CvDto;
import com.skillsmanagerapi.dto.EducationDto;
import com.skillsmanagerapi.dto.LanguageDto;
import com.skillsmanagerapi.dto.OtherDto;
import com.skillsmanagerapi.dto.ProjectDto;
import com.skillsmanagerapi.dto.SkillDto;
import com.skillsmanagerapi.dto.TechnologyDto;
import com.skillsmanagerapi.dto.UserDto;
import com.skillsmanagerapi.services.CvService;
import com.skillsmanagerapi.services.TypeService;
import com.skillsmanagerapi.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RequestMapping(value = "/api/cv")
@RestController
public class CvController {

    private final UserService userService;
    private final CvService cvService;
    private final TypeService typeService;

    @Autowired
    public CvController(UserService userService, CvService cvService, TypeService typeService) {
        this.userService = userService;
        this.cvService = cvService;
        this.typeService = typeService;
    }

    @GetMapping(value = "/my-id")
    public int getCvIdForCurrentUser(@RequestHeader("Authorization") String token) {
        final UserDto userDto = userService.getUserFromToken(token);
        return cvService.getCvOrCreateNew(userDto).getId();
    }

    @PostMapping(value = "/my")
    public CvDto getCvForCurrentUser(@RequestBody UserDto requestedUserDto) {
        final UserDto userDto = userService.getUserOrCreateNew(requestedUserDto);
        return cvService.getCvOrCreateNew(userDto);
    }

    @PreAuthorize("hasAnyAuthority('admin', 'business')")
    @GetMapping
    public List<CvDto> getAllCvs() {
        return cvService.getAllCvs();
    }

    @PreAuthorize("hasAnyAuthority('admin', 'business') or @securityService.isOwnerOfCv(#id)")
    @GetMapping(value = "/{id}")
    public CvDto getCv(@PathVariable("id") int id) {
        return cvService.getCv(id);
    }

    @PreAuthorize("hasAuthority('admin')")
    @PostMapping
    public void createCv(@RequestBody UserDto userDto) {
        final UserDto currentUser = userService.getUserOrCreateNew(userDto);
        cvService.getCvOrCreateNew(currentUser);
    }

    @PreAuthorize("hasAuthority('admin') or @securityService.isOwnerOfCv(#cvDto)")
    @PutMapping
    public void updateCv(@RequestBody CvDto cvDto) {
        cvService.updateCv(cvDto);
    }

    @PreAuthorize("hasAuthority('admin')")
    @DeleteMapping(value = "/{id}")
    public void deleteCv(@PathVariable("id") int id) {
        cvService.deleteCv(id);
    }

    // Language
    @PostMapping(value = "/{cvId}/language")
    public void addLanguageToCv(@PathVariable("cvId") int cvId, @RequestBody LanguageDto languageDto) {
        cvService.addLanguageToCv(cvId, languageDto);
    }

    @PutMapping(value = "/{cvId}/language")
    public void updateLanguage(@PathVariable("cvId") int cvId, @RequestBody LanguageDto languageDto) {
        cvService.updateLanguage(cvId, languageDto);
    }

    @DeleteMapping(value = "/{cvId}/language/{id}")
    public void removeLanguageFromCv(@PathVariable("cvId") int cvId, @PathVariable("id") int id) {
        cvService.removeLanguageFromCv(cvId, id);
    }

//    Education
    @PostMapping(value = "/{cvId}/education")
    public void addEducationToCv(@PathVariable("id") int cvId, @RequestBody EducationDto educationDto) {
        cvService.addEducationToCv(cvId, educationDto);
    }

    @PutMapping(value = "/{cvId}//education")
    public void updateEducation(@PathVariable("cvId") int cvId, @RequestBody EducationDto educationDto) {
        cvService.updateEducation(cvId, educationDto);
    }

    @DeleteMapping(value = "/{cvId}/education/{id}")
    public void removeEducationFromCv(@PathVariable("cvId") int cvId, @PathVariable("id") int id) {
        cvService.removeEducationFromCv(cvId, id);
    }

    // Skill
    @PostMapping(value = "/{cvId}/skill")
    public void addSkillToCv(@PathVariable("cvId") int cvId, @RequestBody SkillDto skillDto) {
        cvService.addSkillToCv(cvId, skillDto);
    }

    @PutMapping(value = "/{cvId}/skill")
    public void updateSkill(@PathVariable("cvId") int cvId, @RequestBody SkillDto skillDto) {
        cvService.updateSkill(cvId, skillDto);
    }

    @DeleteMapping(value = "/{cvId}/skill/{id}")
    public void removeSkillFromCv(@PathVariable("cvId") int cvId, @PathVariable("id") int id) {
        cvService.removeSkillFromCv(cvId, id);
    }

    // Project
    @PostMapping(value = "/{cvId}/project")
    public void addProjectToCv(@PathVariable("cvId") int cvId, @RequestBody ProjectDto projectDto) {
        cvService.addProjectToCv(cvId, projectDto);
    }

    @PutMapping(value = "/{cvId}/project")
    public void updateProject(@PathVariable("cvId") int cvId, @RequestBody ProjectDto projectDto) {
        cvService.updateProject(cvId, projectDto);
    }

    @DeleteMapping(value = "/{cvId}/project/{id}")
    public void removeProjectFromCv(@PathVariable("cvId") int cvId, @PathVariable("id") int id) {
        cvService.removeProjectFromCv(cvId, id);
    }

    // Technology
    @PostMapping(value = "/{cvId}/technology")
    public void addTechnologyToCv(@PathVariable("cvId") int cvId, @RequestBody TechnologyDto technologyDto) {
        cvService.addTechnologyToCv(cvId, technologyDto);
    }

    @PutMapping(value = "/{cvId}/technology")
    public void updateTechnology(@PathVariable("cvId") int cvId, @RequestBody TechnologyDto technologyDto) {
        cvService.updateTechnology(cvId, technologyDto);
    }

    @DeleteMapping(value = "/{cvId}/technology/{id}")
    public void removeTechnologyFromCv(@PathVariable("cvId") int cvId, @PathVariable("id") int id) {
        cvService.removeTechnologyFromCv(cvId, id);
    }

    // Certificate
    @PostMapping(value = "/{cvId}/certificate")
    public void addCertificateToCv(@PathVariable("cvId") int cvId, @RequestBody CertificateDto certificateDto) {
        cvService.addCertificateToCv(cvId, certificateDto);
    }

    @PutMapping(value = "/{cvId}/certificate")
    public void updateCertificate(@PathVariable("cvId") int cvId, @RequestBody CertificateDto certificateDto) {
        cvService.updateCertificate(cvId, certificateDto);
    }

    @DeleteMapping(value = "/{cvId}/certificate/{id}")
    public void removeCertificateFromCv(@PathVariable("cvId") int cvId, @PathVariable("id") int id) {
        cvService.removeCertificateFromCv(cvId, id);
    }

    // Other
    @PostMapping(value = "/{cvId}/other")
    public void addOtherToCv(@PathVariable("cvId") int cvId, @RequestBody OtherDto otherDto) {
        cvService.addOtherToCv(cvId, otherDto);
    }

    @PutMapping(value = "/{cvId}/other")
    public void updateOther(@PathVariable("cvId") int cvId, @RequestBody OtherDto otherDto) {
        cvService.updateOther(cvId, otherDto);
    }

    @DeleteMapping(value = "/{cvId}/other/{id}")
    public void removeOtherFromCv(@PathVariable("cvId") int cvId, @PathVariable("id") int id) {
        cvService.removeOtherFromCv(cvId, id);
    }

    // All types
    @GetMapping(value = "/types")
    public AllTypesDto getAllTypes() {
        return typeService.getAllTypes();
    }
}
