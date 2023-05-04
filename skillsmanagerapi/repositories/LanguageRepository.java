package com.skillsmanagerapi.repositories;

import com.skillsmanagerapi.models.Language;

import com.skillsmanagerapi.models.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LanguageRepository extends JpaRepository<Language, Integer> {
    @Query("from Language lang where lang.languageType.id = ?1")
    List<Language> findByLanguageType(int langTypeId);

}
