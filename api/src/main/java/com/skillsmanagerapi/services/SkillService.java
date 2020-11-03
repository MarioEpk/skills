package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.SkillDto;
import com.skillsmanagerapi.models.Skill;
import com.skillsmanagerapi.models.SkillType;
import com.skillsmanagerapi.repositories.SkillRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

import lombok.NonNull;

@Service
public class SkillService {

    private final SkillRepository skillRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public SkillService(@NonNull final SkillRepository skillRepository, @NonNull final ModelMapper modelMapper) {
        this.skillRepository = skillRepository;
        this.modelMapper = modelMapper;
    }

    public SkillDto getSkill(final int id) {
        return modelMapper.map(skillRepository.findById(id).orElseThrow(EntityNotFoundException::new), SkillDto.class);
    }

    public SkillDto createSkill(@NonNull final SkillDto skillDto) {
        Skill skill = new Skill();
        skill.setLevel(1);
        skill.setSkillType(modelMapper.map(skillDto.getSkillType(), SkillType.class));

        return modelMapper.map(skillRepository.save(skill), SkillDto.class);
    }

    public void updateSkill(@NonNull final SkillDto skillDto) {
        SkillDto updatedSkillDto = this.getSkill(skillDto.getId());
        updatedSkillDto.setLevel(skillDto.getLevel());
        skillRepository.save(modelMapper.map(updatedSkillDto, Skill.class));
    }

    public void deleteSkill(final int id) {
        skillRepository.deleteById(id);
    }

}
