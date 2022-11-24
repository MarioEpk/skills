package com.skillsmanagerapi.repositories;

import com.skillsmanagerapi.models.Skill;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, Integer> {
    @Query("from Skill skill where skill.skillType.id = ?1")
    List<Skill> findBySkillType(int skillTypeId);
}
