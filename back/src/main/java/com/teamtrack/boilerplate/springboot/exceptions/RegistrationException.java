package com.teamtrack.boilerplate.springboot.exceptions;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * @author TeamTrack SESAME
 */
@Getter
@RequiredArgsConstructor
public class RegistrationException extends RuntimeException {

	private final String errorMessage;

}
