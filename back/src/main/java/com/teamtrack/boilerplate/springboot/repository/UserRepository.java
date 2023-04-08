package com.teamtrack.boilerplate.springboot.repository;

import com.teamtrack.boilerplate.springboot.model.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author TeamTrack SESAME
 */
public interface UserRepository extends JpaRepository<User, Long> {


	Optional<User> findById(Long id);
	User findByEmail(String email);
	boolean existsByEmail(String email);
	Optional<List<User>> findByTeamId(Long teamId);

}
