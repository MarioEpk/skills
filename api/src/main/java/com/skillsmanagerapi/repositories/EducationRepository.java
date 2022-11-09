package com.skillsmanagerapi.repositories;

import com.skillsmanagerapi.models.Education;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EducationRepository extends JpaRepository<Education, Integer> { }
