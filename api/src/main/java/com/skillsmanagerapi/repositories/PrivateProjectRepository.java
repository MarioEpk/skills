package com.skillsmanagerapi.repositories;

import com.skillsmanagerapi.models.Cv;
import com.skillsmanagerapi.models.PrivateProject;
import com.skillsmanagerapi.models.ProjectType;
import com.skillsmanagerapi.models.User;
import com.skillsmanagerapi.services.PrivateProjectService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PrivateProjectRepository extends JpaRepository<PrivateProject, Integer> {
    List<PrivateProject> findAllByOrderByNameAsc();
}
