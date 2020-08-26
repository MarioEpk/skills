package com.skillsmanagerapi.repositories;

import com.skillsmanagerapi.models.Skill;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<Skill, Integer> { }
