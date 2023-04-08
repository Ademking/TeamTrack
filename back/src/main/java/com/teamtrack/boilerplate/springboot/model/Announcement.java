package com.teamtrack.boilerplate.springboot.model;

import lombok.*;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.Date;

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
@Table(name = "ANNOUNCEMENTS")
public class Announcement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String content;
    private LocalDate created_at;

    @CreatedDate
	@Column(nullable = false, updatable = false)
	private Date dateCreated;

	@LastModifiedDate
	@Column(nullable = false)
	private Date lastUpdated;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
