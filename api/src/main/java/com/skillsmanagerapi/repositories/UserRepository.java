package com.skillsmanagerapi.repositories;

import com.skillsmanagerapi.models.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {}
