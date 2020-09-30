package com.skillsmanagerapi.repositories;

import com.skillsmanagerapi.models.Project;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Integer> { }
