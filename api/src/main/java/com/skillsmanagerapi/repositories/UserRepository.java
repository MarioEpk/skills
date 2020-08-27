package com.skillsmanagerapi.repositories;

import com.skillsmanagerapi.models.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findAllByOrderByIdAsc();
    Optional<User> findByGoogleEmail(String email);
}
