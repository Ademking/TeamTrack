package com.teamtrack.boilerplate.springboot.model;

import lombok.*;

import java.time.LocalDate;
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
@Table(name = "FORUM_POSTS")
public class ForumPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String category;
    private String content;
    private LocalDate created_at;

    // User who created the post
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_id")
    private User user;

    // Comments which belong to the post
    @OneToMany(mappedBy = "forumPost", cascade = CascadeType.ALL)
    private List<ForumComment> comments;

    
    @CreatedDate
	@Column(nullable = false, updatable = false)
	private Date dateCreated;

	@LastModifiedDate
	@Column(nullable = false)
	private Date lastUpdated;
}
