package com.skillsmanagerapi.repositories;

import com.skillsmanagerapi.models.PositionType;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PositionTypeRepository extends JpaRepository<PositionType, Integer> {
    List<PositionType> findAllByOrderByIdAsc();
}
