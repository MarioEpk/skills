package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.CvDto;
import com.skillsmanagerapi.dto.UserDto;
import com.skillsmanagerapi.models.Cv;
import com.skillsmanagerapi.models.ProjectType;
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
    private final ModelMapper modelMapper;
    private final ModelMapperUtil modelMapperUtil;

    @Autowired
    public CvService(CvRepository cvRepository, ModelMapper modelMapper, ModelMapperUtil modelMapperUtil) {
        this.cvRepository = cvRepository;
        this.modelMapper = modelMapper;
        this.modelMapperUtil = modelMapperUtil;
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

    private Cv createCv(UserDto userDto) {
        Cv cv = new Cv();
        cv.setUser(modelMapper.map(userDto, User.class));
        cvRepository.save(cv);
        return cv;
    }

}
