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

}
