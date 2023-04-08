package com.teamtrack.boilerplate.springboot.repository;

import com.teamtrack.boilerplate.springboot.model.Mission;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author TeamTrack SESAME
 */
public interface MissionRepository extends JpaRepository<Mission, Long> {
    
}
