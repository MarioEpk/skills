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

    @PreAuthorize("hasAuthority('business') or hasAuthority('admin')")
    @PutMapping(value = "/{cvId}/share")
    public void toggleShareStatus(@PathVariable("cvId") int cvId) {
        cvService.toggleShareStatus(cvId);
    }


    // Language
    @PostMapping(value = "/{id}/language")
    public void addLanguageToCv(@RequestBody LanguageDto languageDto, @PathVariable("id") int id) {
        cvService.addLanguageToCv(id, languageDto);
    }

    @PutMapping(value = "/language")
    public void updateLanguage(@RequestBody LanguageDto languageDto) {
        cvService.updateLanguage(languageDto);
    }

    @DeleteMapping(value = "/language/{id}")
    public void removeLanguageFromCv(@PathVariable("id") int id) {
        cvService.removeLanguageFromCv(id);
    }

//    Education
    @PostMapping(value = "/{id}/education")
    public void addEducationToCv(@RequestBody EducationDto educationDto, @PathVariable("id") int id) {
        cvService.addEducationToCv(id, educationDto);
    }

    @PutMapping(value = "/education")
    public void updateEducation(@RequestBody EducationDto educationDto) {
        cvService.updateEducation(educationDto);
    }

    @DeleteMapping(value = "/education/{id}")
    public void removeEducationFromCv(@PathVariable("id") int id) {
        cvService.removeEducationFromCv(id);
    }

    // Skill
    @PostMapping(value = "/{id}/skill")
    public void addSkillToCv(@RequestBody SkillDto skillDto, @PathVariable("id") int id) {
        cvService.addSkillToCv(id, skillDto);
    }

    @PutMapping(value = "/skill")
    public void updateSkill(@RequestBody SkillDto skillDto) {
        cvService.updateSkill(skillDto);
    }

    @DeleteMapping(value = "/skill/{id}")
    public void removeSkillFromCv(@PathVariable("id") int id) {
        cvService.removeSkillFromCv(id);
    }

    // Project
    @PostMapping(value = "/{id}/project")
    public void addProjectToCv(@RequestBody ProjectDto projectDto, @PathVariable("id") int id) {
        cvService.addProjectToCv(id, projectDto);
    }

    @PutMapping(value = "/project")
    public void updateProject(@RequestBody ProjectDto projectDto) {
        cvService.updateProject(projectDto);
    }

    @DeleteMapping(value = "/project/{id}")
    public void removeProjectFromCv(@PathVariable("id") int id) {
        cvService.removeProjectFromCv(id);
    }

    // Technology
    @PostMapping(value = "/{id}/technology")
    public void addTechnologyToCv(@RequestBody TechnologyDto technologyDto, @PathVariable("id") int id) {
        cvService.addTechnologyToCv(id, technologyDto);
    }

    @PutMapping(value = "/technology")
    public void updateTechnology(@RequestBody TechnologyDto technologyDto) {
        cvService.updateTechnology(technologyDto);
    }

    @DeleteMapping(value = "/technology/{id}")
    public void removeTechnologyFromCv(@PathVariable("id") int id) {
        cvService.removeTechnologyFromCv(id);
    }

    // Certificate
    @PostMapping(value = "/{id}/certificate")
    public void addCertificateToCv(@RequestBody CertificateDto certificateDto, @PathVariable("id") int id) {
        cvService.addCertificateToCv(id, certificateDto);
    }

    @PutMapping(value = "/certificate")
    public void updateCertificate(@RequestBody CertificateDto certificateDto) {
        cvService.updateCertificate(certificateDto);
    }

    @DeleteMapping(value = "/certificate/{id}")
    public void removeCertificateFromCv(@PathVariable("id") int id) {
        cvService.removeCertificateFromCv(id);
    }

    // Other
    @PostMapping(value = "/{id}/other")
    public void addOtherToCv(@RequestBody OtherDto otherDto, @PathVariable("id") int id) {
        cvService.addOtherToCv(id, otherDto);
    }

    @PutMapping(value = "/other")
    public void updateOther(@RequestBody OtherDto otherDto) {
        cvService.updateOther(otherDto);
    }

    @DeleteMapping(value = "/other/{id}")
    public void removeOtherFromCv(@PathVariable("id") int id) {
        cvService.removeOtherFromCv(id);
    }

    // All types
    @GetMapping(value = "/types")
    public AllTypesDto getAllTypes() {
        return typeService.getAllTypes();
    }


}
