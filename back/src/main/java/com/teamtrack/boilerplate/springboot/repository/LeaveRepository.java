package com.teamtrack.boilerplate.springboot.repository;

import com.teamtrack.boilerplate.springboot.model.Leave;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author TeamTrack SESAME
 */
public interface LeaveRepository extends JpaRepository<Leave, Long> {
    
}
