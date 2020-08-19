package com.skillsmanagerapi.controllers;

import com.skillsmanagerapi.dto.LanguageTypeDto;
import com.skillsmanagerapi.dto.ProjectTypeDto;
import com.skillsmanagerapi.dto.SkillTypeDto;
import com.skillsmanagerapi.dto.TechnologyTypeDto;
import com.skillsmanagerapi.models.LanguageType;
import com.skillsmanagerapi.models.ProjectType;
import com.skillsmanagerapi.models.SkillType;
import com.skillsmanagerapi.models.TechnologyType;
import com.skillsmanagerapi.services.LanguageTypeService;
import com.skillsmanagerapi.services.ProjectTypeService;
import com.skillsmanagerapi.services.SkillTypeService;
import com.skillsmanagerapi.services.TechnologyTypeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping(value = "/type")
@RestController
public class TypeController {

    private final LanguageTypeService languageTypeService;
    private final SkillTypeService skillTypeService;
    private final TechnologyTypeService technologyTypeService;
    private final ProjectTypeService projectTypeService;

    @Autowired
    public TypeController(LanguageTypeService languageTypeService, SkillTypeService skillTypeService, TechnologyTypeService technologyTypeService, ProjectTypeService projectTypeService) {
        this.languageTypeService = languageTypeService;
        this.skillTypeService = skillTypeService;
        this.technologyTypeService = technologyTypeService;
        this.projectTypeService = projectTypeService;
    }

    // Language Type
    @RequestMapping(value = "/language", method = RequestMethod.GET)
    public List<LanguageType> getAllLanguageTypes() {
        return languageTypeService.getAllLanguageTypes();
    }

    @RequestMapping(value = "/language/{id}", method = RequestMethod.GET)
    public LanguageType getLanguageType(@PathVariable("id") int id) {
        return languageTypeService.getLanguageType(id);
    }

    @RequestMapping(value = "/language", method = RequestMethod.POST)
    public void createLanguageType(@RequestBody LanguageTypeDto languageTypeDto) {
        languageTypeService.createLanguageType(languageTypeDto);
    }

    @RequestMapping(value = "/language", method = RequestMethod.PUT)
    public void updateLanguageType(@RequestBody LanguageTypeDto languageTypeDto) {
        languageTypeService.updateLanguageType(languageTypeDto);
    }

    @RequestMapping(value = "/language/{id}", method = RequestMethod.DELETE)
    public void deleteLanguageType(@PathVariable("id") int id) {
        languageTypeService.deleteLanguageType(id);
    }


    // Skill type
    @RequestMapping(value = "/skill", method = RequestMethod.GET)
    public List<SkillType> getAllSkillTypes() {
        return skillTypeService.getAllSkillTypes();
    }

    @RequestMapping(value = "/skill/{id}", method = RequestMethod.GET)
    public SkillType getSkillType(@PathVariable("id") int id) {
        return skillTypeService.getSkillType(id);
    }

    @RequestMapping(value = "/skill", method = RequestMethod.POST)
    public void createSkillType(@RequestBody SkillTypeDto skillTypeDto) {
        skillTypeService.createSkillType(skillTypeDto);
    }

    @RequestMapping(value = "/skill", method = RequestMethod.PUT)
    public void updateSkillType(@RequestBody SkillTypeDto skillTypeDto) {
        skillTypeService.updateSkillType(skillTypeDto);
    }

    @RequestMapping(value = "/skill/{id}", method = RequestMethod.DELETE)
    public void deleteSkillType(@PathVariable("id") int id) {
        skillTypeService.deleteSkillType(id);
    }


    // technology type
    @RequestMapping(value = "/technology", method = RequestMethod.GET)
    public List<TechnologyType> getAllTechnologyTypes() {
        return technologyTypeService.getAllTechnologyTypes();
    }

    @RequestMapping(value = "/technology/{id}", method = RequestMethod.GET)
    public TechnologyType getTechnologyType(@PathVariable("id") int id) {
        return technologyTypeService.getTechnologyType(id);
    }

    @RequestMapping(value = "/technology", method = RequestMethod.POST)
    public void createTechnologyType(@RequestBody TechnologyTypeDto technologyTypeDto) {
        technologyTypeService.createTechnologyType(technologyTypeDto);
    }

    @RequestMapping(value = "/technology", method = RequestMethod.PUT)
    public void updateSkillType(@RequestBody TechnologyTypeDto technologyTypeDto) {
        technologyTypeService.updateTechnologyType(technologyTypeDto);
    }

    @RequestMapping(value = "/technology/{id}", method = RequestMethod.DELETE)
    public void deleteTechnologyType(@PathVariable("id") int id) {
        technologyTypeService.deleteTechnologyType(id);
    }


    // project type
    @RequestMapping(value = "/project", method = RequestMethod.GET)
    public List<ProjectType> getAllProjectTypes() {
        return projectTypeService.getAllProjectTypes();
    }

    @RequestMapping(value = "/project/{id}", method = RequestMethod.GET)
    public ProjectType getProjectType(@PathVariable("id") int id) {
        return projectTypeService.getProjectType(id);
    }

    @RequestMapping(value = "/project", method = RequestMethod.POST)
    public void createProjectType(@RequestBody ProjectTypeDto projectTypeDto) {
        projectTypeService.createProjectType(projectTypeDto);
    }

    @RequestMapping(value = "/project", method = RequestMethod.PUT)
    public void updateProjectType(@RequestBody ProjectTypeDto projectTypeDto) {
        projectTypeService.updateProjectType(projectTypeDto);
    }

    @RequestMapping(value = "/project/{id}", method = RequestMethod.DELETE)
    public void deleteProjectType(@PathVariable("id") int id) {
        projectTypeService.deleteProjectType(id);
    }

}
