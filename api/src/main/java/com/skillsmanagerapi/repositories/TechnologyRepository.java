package com.skillsmanagerapi.repositories;

import com.skillsmanagerapi.models.Technology;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TechnologyRepository extends JpaRepository<Technology, Integer> { }
