package com.teamtrack.boilerplate.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamtrack.boilerplate.springboot.model.ForumComment;

public interface ForumCommentRepository extends JpaRepository<ForumComment, Long> {
    
}