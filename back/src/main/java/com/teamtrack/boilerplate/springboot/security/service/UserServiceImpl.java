package com.teamtrack.boilerplate.springboot.security.service;

import com.teamtrack.boilerplate.springboot.service.UserValidationService;
import com.teamtrack.boilerplate.springboot.model.User;
import com.teamtrack.boilerplate.springboot.model.UserRole;
import com.teamtrack.boilerplate.springboot.security.dto.AuthenticatedUserDto;
import com.teamtrack.boilerplate.springboot.security.dto.RegistrationRequest;
import com.teamtrack.boilerplate.springboot.security.dto.RegistrationResponse;
import com.teamtrack.boilerplate.springboot.security.mapper.UserMapper;
import com.teamtrack.boilerplate.springboot.utils.GeneralMessageAccessor;
import com.teamtrack.boilerplate.springboot.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * @author TeamTrack SESAME
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private static final String REGISTRATION_SUCCESSFUL = "registration_successful";

	private final UserRepository userRepository;

	private final BCryptPasswordEncoder bCryptPasswordEncoder;

	private final UserValidationService userValidationService;

	private final GeneralMessageAccessor generalMessageAccessor;

	@Override
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	public RegistrationResponse registration(RegistrationRequest registrationRequest) {

		userValidationService.validateUser(registrationRequest);

		final User user = UserMapper.INSTANCE.convertToUser(registrationRequest);
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		user.setUserRole(UserRole.ROLE_EMPLOYEE);

		userRepository.save(user);

		final String email = registrationRequest.getEmail();
		final String registrationSuccessMessage = generalMessageAccessor.getMessage(null, REGISTRATION_SUCCESSFUL,
				email);

		log.info("{} registered successfully!", email);

		return new RegistrationResponse(registrationSuccessMessage);
	}

	@Override
	public AuthenticatedUserDto findAuthenticatedUserByEmail(String email) {

		final User user = findByEmail(email);

		return UserMapper.INSTANCE.convertToAuthenticatedUserDto(user);
	}

	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	@Override
	public User updateUser(Long userId, User user) {
		// get user
		User userToUpdate = userRepository.findById(userId).orElseThrow(
				() -> new RuntimeException("User not found with id: " + userId));
		// update user
		userToUpdate.setFirstname(user.getFirstname());
		userToUpdate.setLastname(user.getLastname());
		userToUpdate.setEmail(user.getEmail());
		userToUpdate.setPhone(user.getPhone());
		userToUpdate.setAddress(user.getAddress());
		userToUpdate.setGender(user.getGender());
		userToUpdate.setBirthdate(user.getBirthdate());
		userToUpdate.setJoinDate(user.getJoinDate());
		if (user.getTeam() != null) {
			userToUpdate.setTeam(user.getTeam());
		} else {
			userToUpdate.setTeam(null);
		}
		return userRepository.save(userToUpdate);
	}

	@Override
	public void deleteUser(Long userId) {
		if (!userRepository.existsById(userId)) {
			throw new RuntimeException("User not found with id: " + userId);
		}
		userRepository.deleteById(userId);
	}

	@Override
	public User addUser(User user) {
		return userRepository.save(user);
	}

	@Override
	public List<User> getUsersByIds(List<Long> userIds) {
		return userRepository.findAllById(userIds);
	}

	@Override
	public User getUserById(Long userId) {
		return userRepository.findById(userId).orElseThrow(
				() -> new RuntimeException("User not found with id: " + userId));
	}

	@Override
	public Boolean checkIfValidOldPassword(User user, String oldPassword) {
		return bCryptPasswordEncoder.matches(oldPassword, user.getPassword());
	}

	@Override
	public User changeUserPassword(User user, String password) {
		user.setPassword(bCryptPasswordEncoder.encode(password));
		return userRepository.save(user);
	}

	
}
