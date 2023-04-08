package com.teamtrack.boilerplate.springboot.security.dto;

import com.teamtrack.boilerplate.springboot.model.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * @author TeamTrack SESAME
 */
@Getter
@Setter
@AllArgsConstructor
public class LoginResponse {

	private String token;
	private User user;

}
