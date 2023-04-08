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
@Table(name = "FORUM_COMMENTS")
@EntityListeners(AuditingEntityListener.class)
public class ForumComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String content;
    private LocalDate created_at;

    // User who created the comment
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_id")
    private User created_by;

    // Forum post which the comment belongs to
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "forum_post_id")
    private ForumPost forumPost;

    
    @CreatedDate
	@Column(nullable = false, updatable = false)
	private Date dateCreated;

	@LastModifiedDate
	@Column(nullable = false)
	private Date lastUpdated;
}
