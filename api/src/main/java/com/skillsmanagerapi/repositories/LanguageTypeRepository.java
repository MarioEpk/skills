package com.skillsmanagerapi.repositories;

import com.skillsmanagerapi.models.LanguageType;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LanguageTypeRepository extends JpaRepository<LanguageType, Integer> {
    LanguageType findById(int id);
}
