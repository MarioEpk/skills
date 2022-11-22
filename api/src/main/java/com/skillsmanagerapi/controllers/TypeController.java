package com.skillsmanagerapi.controllers;

import com.skillsmanagerapi.dto.AllTypesDto;
import com.skillsmanagerapi.dto.LanguageTypeDto;
import com.skillsmanagerapi.dto.PositionTypeDto;
import com.skillsmanagerapi.dto.ProjectTypeDto;
import com.skillsmanagerapi.dto.SkillTypeDto;
import com.skillsmanagerapi.dto.TechnologyTypeDto;
import com.skillsmanagerapi.services.DeleteTypeConstraintException;
import com.skillsmanagerapi.services.LanguageTypeService;
import com.skillsmanagerapi.services.PositionTypeService;
import com.skillsmanagerapi.services.ProjectTypeService;
import com.skillsmanagerapi.services.SkillTypeService;
import com.skillsmanagerapi.services.TechnologyTypeService;
import com.skillsmanagerapi.services.TypeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.util.List;

@PreAuthorize("hasAuthority('admin')")
@RequestMapping(value = "/api/types")
@RestController
public class TypeController {

    private final LanguageTypeService languageTypeService;
    private final SkillTypeService skillTypeService;
    private final TechnologyTypeService technologyTypeService;
    private final ProjectTypeService projectTypeService;
    private final TypeService typeService;
    private final PositionTypeService positionTypeService;

    @Autowired
    public TypeController(
        LanguageTypeService languageTypeService,
        SkillTypeService skillTypeService,
        TechnologyTypeService technologyTypeService,
        ProjectTypeService projectTypeService,
        TypeService typeService,
        PositionTypeService positionTypeService
    ) {
        this.languageTypeService = languageTypeService;
        this.skillTypeService = skillTypeService;
        this.technologyTypeService = technologyTypeService;
        this.projectTypeService = projectTypeService;
        this.typeService = typeService;
        this.positionTypeService = positionTypeService;
    }
    // All types
    @GetMapping
    public AllTypesDto getAllTypes() {
        return typeService.getAllTypes();
    }


    // Language Type
    @GetMapping(value = "/language")
    public List<LanguageTypeDto> getAllLanguageTypes() {
        return languageTypeService.getAllLanguageTypes();
    }

    @GetMapping(value = "/language/{id}")
    public LanguageTypeDto getLanguageType(@PathVariable("id") int id) {
        return languageTypeService.getLanguageType(id);
    }

    @PostMapping(value = "/language")
    public void createLanguageType(@RequestBody LanguageTypeDto languageTypeDto) {
        languageTypeService.createLanguageType(languageTypeDto);
    }

    @PutMapping(value = "/language")
    public void updateLanguageType(@RequestBody LanguageTypeDto languageTypeDto) {
        languageTypeService.updateLanguageType(languageTypeDto);
    }

    @DeleteMapping(value = "/language/{id}")
    public ResponseEntity<?> deleteLanguageType(@PathVariable("id") int id, @PathParam("force") boolean force) {
        try {
            languageTypeService.deleteLanguageType(id, force);
            return ResponseEntity.ok().build();
        } catch (DeleteTypeConstraintException e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
        }
    }


    // Skill type
    @GetMapping(value = "/skill")
    public List<SkillTypeDto> getAllSkillTypes() {
        return skillTypeService.getAllSkillTypes();
    }

    @GetMapping(value = "/skill/{id}")
    public SkillTypeDto getSkillType(@PathVariable("id") int id) {
        return skillTypeService.getSkillType(id);
    }

    @PostMapping(value = "/skill")
    public void createSkillType(@RequestBody SkillTypeDto skillTypeDto) {
        skillTypeService.createSkillType(skillTypeDto);
    }

    @PutMapping(value = "/skill")
    public void updateSkillType(@RequestBody SkillTypeDto skillTypeDto) {
        skillTypeService.updateSkillType(skillTypeDto);
    }

    @DeleteMapping(value = "/skill/{id}")
    public ResponseEntity<?> deleteSkillType(@PathVariable("id") int id, @PathParam("force") boolean force) {
        try {
            skillTypeService.deleteSkillType(id, force);
            return ResponseEntity.ok().build();
        } catch (DeleteTypeConstraintException e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
        }
    }


    // technology type
    @GetMapping(value = "/technology")
    public List<TechnologyTypeDto> getAllTechnologyTypes() {
        return technologyTypeService.getAllTechnologyTypes();
    }

    @GetMapping(value = "/technology/{id}")
    public TechnologyTypeDto getTechnologyType(@PathVariable("id") int id) {
        return technologyTypeService.getTechnologyType(id);
    }

    @PostMapping(value = "/technology")
    public void createTechnologyType(@RequestBody TechnologyTypeDto technologyTypeDto) {
        technologyTypeService.createTechnologyType(technologyTypeDto);
    }

    @PutMapping(value = "/technology")
    public void updateSkillType(@RequestBody TechnologyTypeDto technologyTypeDto) {
        technologyTypeService.updateTechnologyType(technologyTypeDto);
    }

    @DeleteMapping(value = "/technology/{id}")
    public ResponseEntity<?> deleteTechnologyType(@PathVariable("id") int id, @PathParam("force") boolean force) {
        try {
            technologyTypeService.deleteTechnologyType(id, force);
            return ResponseEntity.ok().build();
        } catch (DeleteTypeConstraintException e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
        }

    }


    // project type
    @GetMapping(value = "/project")
    public List<ProjectTypeDto> getAllProjectTypes() {
        return projectTypeService.getAllProjectTypes();
    }

    @GetMapping(value = "/project/{id}")
    public ProjectTypeDto getProjectType(@PathVariable("id") int id) {
        return projectTypeService.getProjectType(id);
    }

    @PostMapping(value = "/project")
    public void createProjectType(@RequestBody ProjectTypeDto projectTypeDto) {
        projectTypeService.createProjectType(projectTypeDto);
    }

    @PutMapping(value = "/project")
    public void updateProjectType(@RequestBody ProjectTypeDto projectTypeDto) {
        projectTypeService.updateProjectType(projectTypeDto);
    }

    @DeleteMapping(value = "/project/{id}")
    public ResponseEntity<?> deleteProjectType(@PathVariable("id") int id, @PathParam("force") boolean force) {
        try {
            projectTypeService.deleteProjectType(id, force);
            return ResponseEntity.ok().build();
        } catch (DeleteTypeConstraintException e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
        }
    }


    // position type
    @GetMapping(value = "/position")
    public List<PositionTypeDto> getAllPositionTypes() {
        return positionTypeService.getAllPositionTypes();
    }

    @GetMapping(value = "/position/{id}")
    public PositionTypeDto getPositionType(@PathVariable("id") int id) {
        return positionTypeService.getPositionType(id);
    }

    @PostMapping(value = "/position")
    public void createPositionType(@RequestBody PositionTypeDto positionTypeDto) {
        positionTypeService.createPositionType(positionTypeDto);
    }

    @PutMapping(value = "/position")
    public void updatePositionType(@RequestBody PositionTypeDto positionTypeDto) {
        positionTypeService.updatePositionType(positionTypeDto);
    }

    @DeleteMapping(value = "/position/{id}")
    public ResponseEntity<?> deletePositionType(@PathVariable("id") int id) {
        try {
            positionTypeService.deletePositionType(id, false);  //TODO
            return ResponseEntity.ok().build();
        } catch (DeleteTypeConstraintException e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
        }
    }

}
