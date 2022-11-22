package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.LanguageTypeDto;
import com.skillsmanagerapi.models.Cv;
import com.skillsmanagerapi.models.Language;
import com.skillsmanagerapi.models.LanguageType;
import com.skillsmanagerapi.repositories.CvRepository;
import com.skillsmanagerapi.repositories.LanguageRepository;
import com.skillsmanagerapi.repositories.LanguageTypeRepository;
import com.skillsmanagerapi.repositories.SkillRepository;
import com.skillsmanagerapi.utils.DeleteResolver;
import com.skillsmanagerapi.utils.ModelMapperUtil;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import lombok.NonNull;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LanguageTypeService {
    private final LanguageTypeRepository languageTypeRepository;
    private final ModelMapper modelMapper;
    private final ModelMapperUtil modelMapperUtil;
    private final DeleteResolver deleteResolver;

    @Autowired
    public LanguageTypeService(@NonNull final LanguageTypeRepository languageTypeRepository,
                               @NonNull final ModelMapper modelMapper,
                               @NonNull final ModelMapperUtil modelMapperUtil,
                               @NonNull final DeleteResolver deleteResolver) {
        this.languageTypeRepository = languageTypeRepository;
        this.modelMapper = modelMapper;
        this.modelMapperUtil = modelMapperUtil;
        this.deleteResolver = deleteResolver;
    }

    public List<LanguageTypeDto> getAllLanguageTypes() {
        return modelMapperUtil.mapList(languageTypeRepository.findAllByOrderByNameAsc(), LanguageTypeDto.class);
    }

    public LanguageTypeDto getLanguageType(final int id) {
        return modelMapper.map(languageTypeRepository.findById(id).orElseThrow(EntityNotFoundException::new), LanguageTypeDto.class);
    }

    @Transactional
    public void createLanguageType(@NonNull final LanguageTypeDto languageTypeDto) {
        languageTypeRepository.save(modelMapper.map(languageTypeDto, LanguageType.class));
    }

    @Transactional
    public void updateLanguageType(@NonNull final LanguageTypeDto languageTypeDto) {
        final LanguageTypeDto updatedLanguageTypeDto = getLanguageType(languageTypeDto.getId());
        updatedLanguageTypeDto.setName(languageTypeDto.getName());
        languageTypeRepository.save(modelMapper.map(updatedLanguageTypeDto, LanguageType.class));
    }

    @Transactional
    public void deleteLanguageType(final int id, final boolean forceDelete) throws DeleteTypeConstraintException {
        deleteResolver.resolveConstraints(LanguageRepository.class, LanguageRepository::findByLanguageType, id, forceDelete);
        languageTypeRepository.deleteById(id);
    }


}
