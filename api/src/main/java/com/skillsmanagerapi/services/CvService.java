package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.CvDto;
import com.skillsmanagerapi.dto.LanguageDto;
import com.skillsmanagerapi.dto.UserDto;
import com.skillsmanagerapi.models.Cv;
import com.skillsmanagerapi.models.User;
import com.skillsmanagerapi.repositories.CvRepository;
import com.skillsmanagerapi.util.ModelMapperUtil;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import javax.persistence.EntityNotFoundException;

@Service
public class CvService {

    private final CvRepository cvRepository;
    private final LanguageService languageService;
    private final ModelMapper modelMapper;
    private final ModelMapperUtil modelMapperUtil;

    @Autowired
    public CvService(CvRepository cvRepository, ModelMapper modelMapper, ModelMapperUtil modelMapperUtil, LanguageService languageService) {
        this.cvRepository = cvRepository;
        this.modelMapper = modelMapper;
        this.modelMapperUtil = modelMapperUtil;
        this.languageService = languageService;
    }

    public CvDto getCvOrCreateNew(UserDto userDto) {
        Cv cv = cvRepository.findByUser(modelMapper.map(userDto, User.class)).orElseGet(() -> createCv(userDto));
        return modelMapper.map(cv, CvDto.class);
    }

    public CvDto getCv(int id) {
        return modelMapper.map(cvRepository.findById(id).orElseThrow(EntityNotFoundException::new), CvDto.class);
    }

    public void deleteCv(int id) {
        cvRepository.deleteById(id);
    }

    public List<CvDto> getAllCvs() {
        return modelMapperUtil.mapList(cvRepository.findAllByOrderByIdAsc(), CvDto.class);
    }

    public void updateCv(CvDto cvDto) {
        CvDto updatedCvDto = this.getCv(cvDto.getId());
        UserDto userDto = updatedCvDto.getUser();
        userDto.setFirstName(cvDto.getUser().getFirstName());
        userDto.setLastName(cvDto.getUser().getLastName());
        updatedCvDto.setUser(userDto);
        updatedCvDto.setProfile(cvDto.getProfile());
        cvRepository.save(modelMapper.map(updatedCvDto, Cv.class));
    }

    public void addLanguageToCv(int cvId, LanguageDto languageDto) {
        LanguageDto newLanguageDto = languageService.createLanguage(languageDto);
        CvDto cvDto = this.getCv(cvId);
        List<LanguageDto> languageDtoList = cvDto.getLanguages();
        languageDtoList.add(newLanguageDto);
        cvDto.setLanguages(languageDtoList);
        cvRepository.save(modelMapper.map(cvDto, Cv.class));
    }

    public void removeLanguageFromCv(LanguageDto languageDto) {
        languageService.deleteLanguage(languageDto.getId());
    }

    private Cv createCv(UserDto userDto) {
        Cv cv = new Cv();
        cv.setUser(modelMapper.map(userDto, User.class));
        cvRepository.save(cv);
        return cv;
    }
}
