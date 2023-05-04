package com.skillsmanagerapi.repositories;

import com.skillsmanagerapi.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
    @Query("from Project project where project.projectType.id = ?1")
    List<Project> findByProjectType(int projectTypeId);

    @Query("from Project project join project.technologies tech where tech.id = ?1")
    List<Project> findByTechnologyType(int technologyTypeId);
    @Query("from Project project join project.positions position where position.id = ?1")
    List<Project> findByPositionType(int positionTypeId);

}
