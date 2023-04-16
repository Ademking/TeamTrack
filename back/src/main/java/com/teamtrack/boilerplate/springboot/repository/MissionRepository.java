package com.teamtrack.boilerplate.springboot.repository;

import com.teamtrack.boilerplate.springboot.model.Mission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * @author TeamTrack SESAME
 */
public interface MissionRepository extends JpaRepository<Mission, Long> {
}
