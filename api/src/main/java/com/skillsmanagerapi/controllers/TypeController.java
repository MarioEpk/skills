package com.skillsmanagerapi.controllers;

import com.skillsmanagerapi.dto.LanguageTypeDto;
import com.skillsmanagerapi.models.LanguageType;
import com.skillsmanagerapi.services.LanguageTypeService;

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

    @Autowired
    public TypeController(LanguageTypeService languageTypeService) {
        this.languageTypeService = languageTypeService;
    }

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

}
