package com.skillsmanagerapi.controllers;

import com.skillsmanagerapi.dto.AllTypesDto;
import com.skillsmanagerapi.dto.CertificateDto;
import com.skillsmanagerapi.dto.CvDto;
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
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Base64;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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

    @RequestMapping(value = "/my-id", method = RequestMethod.GET)
    public int getCvForCurrentUser(@RequestHeader("Authorization") String token) {
        UserDto userDto = userService.getUserFromToken(token);
        return cvService.getCvOrCreateNew(userDto).getId();
    }

    @RequestMapping(value = "/my", method = RequestMethod.POST)
    public CvDto process(@RequestBody UserDto requestedUserDto) {
        UserDto userDto = userService.getUserOrCreateNew(requestedUserDto);
        return cvService.getCvOrCreateNew(userDto);
    }

    @PreAuthorize("hasAnyAuthority('admin', 'business')")
    @RequestMapping(method = RequestMethod.GET)
    public List<CvDto> getAllCvs() {
        return cvService.getAllCvs();
    }

    @PreAuthorize("hasAnyAuthority('admin', 'business') or @securityService.isOwnerOfCv(#id)")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public CvDto getCv(@PathVariable("id") int id) {
        return cvService.getCv(id);
    }

    @PreAuthorize("hasAuthority('admin')")
    @RequestMapping(method = RequestMethod.POST)
    public void createCv(@RequestBody UserDto userDto) {
        UserDto currentUser = userService.getUserOrCreateNew(userDto);
        cvService.getCvOrCreateNew(currentUser);
    }

    @PreAuthorize("hasAuthority('admin') or @securityService.isOwnerOfCv(#cvDto)")
    @RequestMapping(method = RequestMethod.PUT)
    public void updateCv(@RequestBody CvDto cvDto) {
        cvService.updateCv(cvDto);
    }

    @PreAuthorize("hasAuthority('admin')")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteCv(@PathVariable("id") int id) {
        cvService.deleteCv(id);
    }

    @PreAuthorize("hasAnyAuthority('admin', 'business') or @securityService.isOwnerOfCv(#id)")
    @RequestMapping(value = "/{id}/export", method = RequestMethod.GET, produces = "application/pdf")
    public ResponseEntity<?> exportCv(@PathVariable("id") int id) throws Exception {

        final byte[] pdf = cvService.exportCvPdf(id);

        //Conversion of bytes to Base64
        byte[] encodedBytes = Base64.getEncoder().encode(pdf);

        //Setting Headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/pdf"));
        headers.setContentDispositionFormData("pdfFileName.pdf", "pdfFileName.pdf");
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        headers.setContentLength(encodedBytes.length);

        return new ResponseEntity<>(encodedBytes, headers, HttpStatus.OK);
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

    // All types
    @RequestMapping(value = "/types", method = RequestMethod.GET)
    public AllTypesDto getAllTypes() {
        return typeService.getAllTypes();
    }
}
