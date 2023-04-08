package com.teamtrack.boilerplate.springboot.controller;

import com.teamtrack.boilerplate.springboot.security.dto.RegistrationRequest;
import com.teamtrack.boilerplate.springboot.security.dto.RegistrationResponse;
import com.teamtrack.boilerplate.springboot.security.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * @author TeamTrack SESAME
 */
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/register")
public class RegistrationController {

	private final UserService userService;

	@PostMapping
	public ResponseEntity<RegistrationResponse> registrationRequest(@Valid @RequestBody RegistrationRequest registrationRequest) {

		final RegistrationResponse registrationResponse = userService.registration(registrationRequest);
		return ResponseEntity.status(HttpStatus.CREATED).body(registrationResponse);
	}

}
