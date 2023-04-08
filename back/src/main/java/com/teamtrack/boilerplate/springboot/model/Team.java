package com.teamtrack.boilerplate.springboot.model;

import lombok.*;

import java.time.OffsetDateTime;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "TEAMS")
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<User> users;

    @CreatedDate
	@Column(nullable = false, updatable = false)
	private Date dateCreated;

	@LastModifiedDate
	@Column(nullable = false)
	private Date lastUpdated;
}
