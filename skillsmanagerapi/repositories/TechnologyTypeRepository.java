package com.skillsmanagerapi.repositories;

import com.skillsmanagerapi.models.TechnologyType;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TechnologyTypeRepository extends JpaRepository<TechnologyType, Integer> {
    List<TechnologyType> findAllByOrderByNameAsc();
}
