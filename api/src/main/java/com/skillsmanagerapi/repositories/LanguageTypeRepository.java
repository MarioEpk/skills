package com.skillsmanagerapi.repositories;

import com.skillsmanagerapi.models.LanguageType;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LanguageTypeRepository extends JpaRepository<LanguageType, Integer> {
    List<LanguageType> findAllByOrderByIdAsc();
}
