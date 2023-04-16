package com.teamtrack.boilerplate.springboot.controller;

import com.teamtrack.boilerplate.springboot.security.dto.LoginRequest;
import com.teamtrack.boilerplate.springboot.security.dto.LoginResponse;
import com.teamtrack.boilerplate.springboot.security.jwt.JwtTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import javax.validation.Valid;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/login")
public class LoginController {

	private final JwtTokenService jwtTokenService;

	@PostMapping
	public ResponseEntity<LoginResponse> loginRequest(@Valid @RequestBody LoginRequest loginRequest) {
		final LoginResponse loginResponse = jwtTokenService.getLoginResponse(loginRequest);
		return ResponseEntity.ok(loginResponse);
	}

	@GetMapping("/forgot-password/{email}")
	public ResponseEntity<?> forgotPassword(@PathVariable String email) {
		return ResponseEntity.ok().body(Map.of("message", "Email sent"));
	}


}
