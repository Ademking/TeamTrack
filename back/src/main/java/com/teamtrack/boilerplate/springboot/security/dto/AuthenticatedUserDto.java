package com.teamtrack.boilerplate.springboot.security.dto;

import com.teamtrack.boilerplate.springboot.model.UserRole;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author TeamTrack SESAME
 */
@Getter
@Setter
@NoArgsConstructor
public class AuthenticatedUserDto {

	private Long id;

	private String firstname;

	private String lastname;

	private String email;

	private String password;

	private String gender;
	
	private UserRole userRole;

	private String job;

}
