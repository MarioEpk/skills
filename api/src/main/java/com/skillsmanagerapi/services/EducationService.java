package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.EducationDto;
import com.skillsmanagerapi.dto.OtherDto;
import com.skillsmanagerapi.models.Education;
import com.skillsmanagerapi.repositories.EducationRepository;
import lombok.NonNull;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
public class EducationService {

    private final EducationRepository educationRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public EducationService(@NonNull final EducationRepository educationRepository, @NonNull final ModelMapper modelMapper) {

        this.educationRepository = educationRepository;
        this.modelMapper = modelMapper;
    }

    public EducationDto getEducation(final int id) {
        return modelMapper.map(educationRepository.findById(id).orElseThrow(EntityNotFoundException::new), EducationDto.class);
    }

    public EducationDto createEducation(@NonNull final EducationDto educationDto) {
        final Education education = new Education();
        education.setSchool(educationDto.getSchool());
        education.setField(educationDto.getField());
        education.setNote(educationDto.getNote());
        education.setYearFrom(educationDto.getYearFrom());
        education.setYearTo(educationDto.getYearTo());

        return modelMapper.map(educationRepository.save(education), EducationDto.class);
    }

    public void updateEducation(@NonNull final EducationDto educationDto) {
        final EducationDto updatedEducationDto = this.getEducation(educationDto.getId());
        updatedEducationDto.setSchool(educationDto.getSchool());
        updatedEducationDto.setField(educationDto.getField());
        updatedEducationDto.setNote(educationDto.getNote());
        updatedEducationDto.setYearFrom(educationDto.getYearFrom());
        updatedEducationDto.setYearTo(educationDto.getYearTo());

        educationRepository.save(modelMapper.map(updatedEducationDto, Education.class));
    }

    public void deleteEducation(final int id) {
        educationRepository.deleteById(id);
    }
}
