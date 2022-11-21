package com.skillsmanagerapi.repositories;

import com.skillsmanagerapi.models.Cv;
import com.skillsmanagerapi.models.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CvRepository extends JpaRepository<Cv, Integer> {
    Optional<Cv> findByUser(User user);
    List<Cv> findAllByOrderByIdAsc();
    Optional<Cv> findByExternalCode(String externalCode);

    @Query("from Cv cv join cv.languages language where language.id = ?1")
    List<Cv> findByLanguage(int langId);

    @Query("from Cv cv join cv.skills skill where skill.id = ?1")
    List<Cv> findBySkill(int skillId);

    @Query("from Cv cv join cv.projects project where project.id = ?1")
    List<Cv> findByProject(Integer prjId);

    @Query("from Cv cv join cv.technologies technology where technology.id = ?1")
    List<Cv> findByTechnology(int technologyId);

    @Query("from Cv cv join cv.positions position where position.id = ?1")
    List<Cv> findByPosition(Integer positionId);

}
