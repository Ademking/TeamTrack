package com.teamtrack.boilerplate.springboot.model;

import lombok.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

import javax.persistence.*;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

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
@Table(name = "MISSIONS")
public class Mission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    @Enumerated(EnumType.STRING)
    private MissionStatus missionStatus;

    @ManyToMany(mappedBy = "missions")
    private Set<User> employees;

    @CreatedDate
	@Column(nullable = false, updatable = false)
	private Date dateCreated;

	@LastModifiedDate
	@Column(nullable = false)
	private Date lastUpdated;

}
