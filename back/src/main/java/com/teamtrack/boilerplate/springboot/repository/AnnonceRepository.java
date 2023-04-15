package com.teamtrack.boilerplate.springboot.repository;

import com.teamtrack.boilerplate.springboot.model.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author TeamTrack SESAME
 */
public interface AnnonceRepository extends JpaRepository<Announcement, Long> {
    
}