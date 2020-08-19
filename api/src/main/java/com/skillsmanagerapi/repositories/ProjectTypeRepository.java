package com.skillsmanagerapi.repositories;

import com.skillsmanagerapi.models.ProjectType;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectTypeRepository extends JpaRepository<ProjectType, Integer> {
    List<ProjectType> findAllByOrderByIdAsc();

}
