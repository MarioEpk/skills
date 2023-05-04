package com.skillsmanagerapi.repositories;

import com.skillsmanagerapi.models.Cv;
import com.skillsmanagerapi.models.Project;
import com.skillsmanagerapi.models.ProjectType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProjectTypeRepository extends JpaRepository<ProjectType, Integer> {
    List<ProjectType> findAllByOrderByNameAsc();

    @Query("from ProjectType projectType join projectType.technologies tech where tech.id = ?1")
    List<ProjectType> findByTechnologyType(int techTypeId);


}
