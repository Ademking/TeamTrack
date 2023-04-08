package com.teamtrack.boilerplate.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaRepositories
@EnableAspectJAutoProxy
@EnableJpaAuditing
public class SpringBootBoilerplateApplication {

	public static void main(String[] args) {

		SpringApplication.run(SpringBootBoilerplateApplication.class, args);
	}

}
