package com.teamtrack.boilerplate.springboot.utils;

import java.util.Locale;

/**
 * @author TeamTrack SESAME
 */
public final class ProjectConstants {

	// FIXME : Customize project constants for your application.

	public static final String DEFAULT_ENCODING = "UTF-8";
	public static final Locale DEFAULT_LOCALE = new Locale.Builder().setLanguage("en").setRegion("US").build();

	private ProjectConstants() {

		throw new UnsupportedOperationException();
	}

}
