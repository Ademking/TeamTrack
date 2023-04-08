package com.teamtrack.boilerplate.springboot.security.jwt;

import com.teamtrack.boilerplate.springboot.security.mapper.UserMapper;
import com.teamtrack.boilerplate.springboot.security.service.UserService;
import com.teamtrack.boilerplate.springboot.model.User;
import com.teamtrack.boilerplate.springboot.security.dto.AuthenticatedUserDto;
import com.teamtrack.boilerplate.springboot.security.dto.LoginRequest;
import com.teamtrack.boilerplate.springboot.security.dto.LoginResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

/**
 * @author TeamTrack SESAME
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class JwtTokenService {

	private final UserService userService;

	private final JwtTokenManager jwtTokenManager;

	private final AuthenticationManager authenticationManager;

	public LoginResponse getLoginResponse(LoginRequest loginRequest) {

		final String email = loginRequest.getEmail();
		final String password = loginRequest.getPassword();

		final UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(email, password);

		authenticationManager.authenticate(usernamePasswordAuthenticationToken);

		final AuthenticatedUserDto authenticatedUserDto = userService.findAuthenticatedUserByEmail(email);

		final User user = UserMapper.INSTANCE.convertToUser(authenticatedUserDto);
		final String token = jwtTokenManager.generateToken(user);

		log.info("{} has successfully logged in!", user.getEmail());

		return new LoginResponse(token, user);
		
	}

}
