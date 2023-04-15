package com.teamtrack.boilerplate.springboot.security.service;

import java.util.List;

import com.teamtrack.boilerplate.springboot.model.User;
import com.teamtrack.boilerplate.springboot.security.dto.AuthenticatedUserDto;
import com.teamtrack.boilerplate.springboot.security.dto.RegistrationRequest;
import com.teamtrack.boilerplate.springboot.security.dto.RegistrationResponse;

/**
 * @author TeamTrack SESAME
 */
public interface UserService {

	User findByEmail(String email);

	RegistrationResponse registration(RegistrationRequest registrationRequest);

	AuthenticatedUserDto findAuthenticatedUserByEmail(String email);

	List<User> getAllUsers();

	User updateUser(Long userId, User user);

	void deleteUser(Long userId);

	User addUser(User user);

	List<User> getUsersByIds(List<Long> userIds);

	User getUserById(Long userId);

}
