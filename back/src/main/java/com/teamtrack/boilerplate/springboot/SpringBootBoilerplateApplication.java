package com.teamtrack.boilerplate.springboot;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.github.javafaker.Faker;
import com.teamtrack.boilerplate.springboot.model.Announcement;
import com.teamtrack.boilerplate.springboot.model.Mission;
import com.teamtrack.boilerplate.springboot.model.MissionStatus;
import com.teamtrack.boilerplate.springboot.model.Team;
import com.teamtrack.boilerplate.springboot.model.User;
import com.teamtrack.boilerplate.springboot.model.UserRole;
import com.teamtrack.boilerplate.springboot.repository.AnnonceRepository;
import com.teamtrack.boilerplate.springboot.repository.MissionRepository;
import com.teamtrack.boilerplate.springboot.repository.TeamsRepository;
import com.teamtrack.boilerplate.springboot.repository.UserRepository;
import com.teamtrack.boilerplate.springboot.utils.FakeTunisianNames;

import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaRepositories
@EnableAspectJAutoProxy
@EnableJpaAuditing
public class SpringBootBoilerplateApplication {

	@Autowired
	UserRepository employeeRepository;
	@Autowired
	TeamsRepository teamsRepository;
	@Autowired
	MissionRepository missionRepository;
	@Autowired
	AnnonceRepository annonceRepository;
	@Autowired
	private Environment env;
	

	public static void main(String[] args) {

		SpringApplication.run(SpringBootBoilerplateApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner() {
		return args -> {
			
			// check if we need to run faker
			Boolean runFaker = env.getProperty("run-faker", Boolean.class);
			if (runFaker == null || !runFaker) {
				return;
			}

			System.out.println("======================================");
			System.out.println("Running Faker...");
			System.out.println("======================================");

			int maxEmployees = 100; // Number of employees to generate
			int maxTeams = 5; // Number of teams to generate
			int maxMissions = 10; // Number of missions to generate
			int maxAnnonces = 10; // Number of announcements to generate
			String defaultPassword = "123456"; // Default password for all employees

			Faker faker = new Faker(new Locale("en-US"));
			HashMap<Integer, User> mapEmployees = new HashMap<>();
			HashMap<Integer, Team> mapTeams = new HashMap<>();
			HashMap<Integer, Mission> mapMissions = new HashMap<>();
			HashMap<Integer, Announcement> mapAnnonces = new HashMap<>();
			BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

			// Create Administator
			User admin = new User();
			admin.setFirstname("Foulen");
			admin.setLastname("Fouleni");
			admin.setEmail("foulen@gmail.com");
			admin.setPhone("12345678");
			admin.setAddress("Tunis, Tunisie");
			admin.setGender("m");
			admin.setBirthdate(faker.date().birthday().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
			admin.setJob("Responsable RH");
			admin.setJoinDate(faker.date().birthday().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
			admin.setEmployeeCode(faker.code().isbn10());
			admin.setUserRole(UserRole.ROLE_ADMIN);
			admin.setTeam(null);
			admin.setPassword(bCryptPasswordEncoder.encode(defaultPassword)); // Password: 123456
			employeeRepository.save(admin);


			// Create random teams
			for (int i = 0; i < maxTeams; i++) {
				Team team = new Team();
				team.setName("Groupe " + (i + 1));
				team.setDescription("Groupe " + (i + 1));
				mapTeams.put(i, team);
			}

			// create random missions
			for (int i = 0; i < maxMissions; i++) {
				Mission mission = new Mission();
				mission.setName("Mission " + (i + 1));
				mission.setDescription("Mission " + (i + 1));
				LocalDate startLocalDate = faker.date().birthday().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
				Date startDate = Date.from(startLocalDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
				mission.setStartDate(startLocalDate);
				mission.setEndDate(faker.date().between(startDate, new Date()).toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
				mission.setMissionStatus(faker.options().option(MissionStatus.class));
				mapMissions.put(i, mission);
			}

			// create random announcements
			for (int i = 0; i < maxAnnonces; i++) {
				Announcement announcement = new Announcement();
				announcement.setTitle(faker.book().title());
				announcement.setContent(faker.lorem().paragraph());
				mapAnnonces.put(i, announcement);
			}

			// Create random employees
			for (int i = 0; i < maxEmployees; i++) {
				// Create employee
				User employee = new User();
				String firstname = faker.options().option(FakeTunisianNames.firstNames);
				String lastname = faker.options().option(FakeTunisianNames.lastNames);
				employee.setFirstname(firstname);
				employee.setLastname(lastname);
				employee.setEmail(firstname.replaceAll("\\s", "").toLowerCase() + "." + lastname.replaceAll("\\s", "").toLowerCase() + faker.random().nextInt(1000) + "@gmail.com");
				employee.setPhone(faker.phoneNumber().phoneNumber());
				employee.setAddress(faker.address().fullAddress());
				employee.setGender(faker.options().option("m", "f"));
				employee.setBirthdate(faker.date().birthday().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
				employee.setJob(faker.company().profession());
				employee.setJoinDate(faker.date().birthday().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
				employee.setEmployeeCode(faker.code().isbn10());
				employee.setPassword(bCryptPasswordEncoder.encode(defaultPassword)); // Password: 123456
				employee.setUserRole(UserRole.ROLE_EMPLOYEE);
				employee.setTeam(mapTeams.get(faker.number().numberBetween(0, maxTeams - 1))); // Assign random team to employee
				employee.setMissions(Collections.singletonList(mapMissions.get(faker.number().numberBetween(0, maxMissions - 1)))); // Assign random mission to employee
				mapEmployees.put(i, employee);
			}


			// Save
			missionRepository.saveAll(mapMissions.values());
			teamsRepository.saveAll(mapTeams.values());
			employeeRepository.saveAll(mapEmployees.values());
			annonceRepository.saveAll(mapAnnonces.values());

			System.out.println("======================================");
			System.out.println("Fake data generated successfully!");
			System.out.println("======================================");

		};
	}

}