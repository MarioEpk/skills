package com.skillsmanagerapi.repositories;

import com.skillsmanagerapi.models.Skill;
import com.skillsmanagerapi.models.Technology;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TechnologyRepository extends JpaRepository<Technology, Integer> {
    @Query("from Technology tech where tech.technologyType.id = ?1")
    List<Technology> findByTechnologyType(int technologyTypeId);

}
