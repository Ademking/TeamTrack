package com.teamtrack.boilerplate.springboot.security.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

/**
 * @author TeamTrack SESAME
 */
@Getter
@Setter
@NoArgsConstructor
public class LoginRequest {

	@NotEmpty(message = "{login_email_not_empty}")
	private String email;

	@NotEmpty(message = "{login_password_not_empty}")
	private String password;

}
