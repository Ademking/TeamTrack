package com.teamtrack.boilerplate.springboot.model;

import lombok.*;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.*;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;

/**
 * @author TeamTrack SESAME
 */
@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "USERS")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String firstname;
	private String lastname;
	private String phone;
	private String address;
	private String gender; // M or F
	@Column(unique = true)
	private String email;
	@JsonIgnore // password will not be returned in response
	private String password;
	private LocalDate birthdate;
	private String job;
	private LocalDate joinDate;
	private String employeeCode;
	@Enumerated(EnumType.STRING)
	private UserRole userRole;

	// Many to many relationship with Mission
	@ManyToMany
	@JoinTable(name = "user_missions", joinColumns = @JoinColumn(name = "employee_id"), inverseJoinColumns = @JoinColumn(name = "mission_id"))
	private List<Mission> missions;

	// One to many relationship with Leave
	@OneToMany(mappedBy = "user")
	private List<Leave> leaves;

	// Many to many relationship with Formation
	@ManyToMany
	@JoinTable(name = "user_formations", joinColumns = @JoinColumn(name = "employee_id"), inverseJoinColumns = @JoinColumn(name = "formation_id"))
	private List<Formation> formations;

	// One to many relationship with Announcement
	@OneToMany(mappedBy = "user")
	private List<Announcement> announcements;

	// One to many relationship with ForumPost
	@OneToMany(mappedBy = "user")
	private List<ForumPost> forumPosts;

	// One to many relationship with Team
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
	@JsonIncludeProperties(value = {"id", "name"})
    private Team team;

	@CreatedDate
	@Column(nullable = false, updatable = false)
	private Date dateCreated;

	@LastModifiedDate
	@Column(nullable = false)
	private Date lastUpdated;

}
