package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.LanguageTypeDto;
import com.skillsmanagerapi.models.LanguageType;
import com.skillsmanagerapi.repositories.LanguageTypeRepository;
import com.skillsmanagerapi.utils.ModelMapperUtil;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import javax.persistence.EntityNotFoundException;

@Service
public class LanguageTypeService {

    private final LanguageTypeRepository languageTypeRepository;
    private final ModelMapper modelMapper;
    private final ModelMapperUtil modelMapperUtil;

    @Autowired
    public LanguageTypeService(LanguageTypeRepository languageTypeRepository, ModelMapper modelMapper, ModelMapperUtil modelMapperUtil) {
        this.languageTypeRepository = languageTypeRepository;
        this.modelMapper = modelMapper;
        this.modelMapperUtil = modelMapperUtil;
    }

    public List<LanguageTypeDto> getAllLanguageTypes() {
        return modelMapperUtil.mapList(languageTypeRepository.findAllByOrderByIdAsc(), LanguageTypeDto.class);
    }

    public LanguageTypeDto getLanguageType(int id) {
        return modelMapper.map(languageTypeRepository.findById(id).orElseThrow(EntityNotFoundException::new), LanguageTypeDto.class);
    }

    public void createLanguageType(LanguageTypeDto languageTypeDto) {
        languageTypeRepository.save(modelMapper.map(languageTypeDto, LanguageType.class));
    }

    public void updateLanguageType(LanguageTypeDto languageTypeDto) {
        LanguageTypeDto updatedLanguageTypeDto = getLanguageType(languageTypeDto.getId());
        updatedLanguageTypeDto.setName(languageTypeDto.getName());
        languageTypeRepository.save(modelMapper.map(updatedLanguageTypeDto, LanguageType.class));
    }

    public void deleteLanguageType(int id) {
        languageTypeRepository.deleteById(id);
    }


}
