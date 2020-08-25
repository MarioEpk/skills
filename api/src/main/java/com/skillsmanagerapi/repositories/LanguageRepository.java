package com.skillsmanagerapi.repositories;

import com.skillsmanagerapi.models.Language;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LanguageRepository extends JpaRepository<Language, Integer> { }
