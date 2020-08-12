package com.skillsmanagerapi.repositories;

import com.skillsmanagerapi.models.SkillType;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillTypeRepository extends JpaRepository<SkillType, Integer> { }
