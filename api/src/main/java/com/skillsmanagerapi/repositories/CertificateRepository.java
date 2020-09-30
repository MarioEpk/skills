package com.skillsmanagerapi.repositories;

import com.skillsmanagerapi.models.Certificate;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CertificateRepository extends JpaRepository<Certificate, Integer> { }
