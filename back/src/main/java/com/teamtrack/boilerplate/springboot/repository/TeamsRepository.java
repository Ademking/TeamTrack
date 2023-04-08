package com.teamtrack.boilerplate.springboot.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamtrack.boilerplate.springboot.model.Team;

public interface TeamsRepository extends JpaRepository<Team, Long> {
    
    Optional<Team> findById(Long id);
}
