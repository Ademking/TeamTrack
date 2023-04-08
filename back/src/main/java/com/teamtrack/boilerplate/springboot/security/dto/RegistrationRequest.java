package com.teamtrack.boilerplate.springboot.security.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.Date;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.PastOrPresent;

/**
 * @author TeamTrack SESAME
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
public class RegistrationRequest {


	@Past(message = "{user_birthdate_not_past}")
	private LocalDate birthdate;

	@Past(message = "{join_date_not_past}")
	private LocalDate joinDate;

	@NotEmpty(message = "{user_address_not_empty}")
	private String address;

	@Email(message = "{user_email_not_valid}")
	@NotEmpty(message = "{user_email_not_empty}")
	private String email;

	@NotEmpty(message = "{user_employee_code_not_empty}")
	private String employeeCode;

	@NotEmpty(message = "{user_firstname_not_empty}")
	private String firstname;

	@NotEmpty(message = "{user_gender_not_null}")
	private String gender;

	@NotEmpty(message = "{user_lastname_not_empty}")
	private String lastname;

	@NotEmpty(message = "{user_password_not_empty}")
	private String password;

	@NotEmpty(message = "{user_phone_not_empty}")
	private String phone;

	@NotEmpty(message = "{user_job_not_empty}")
	private String job;

}
