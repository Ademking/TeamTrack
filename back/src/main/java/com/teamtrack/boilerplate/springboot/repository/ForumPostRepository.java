package com.teamtrack.boilerplate.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamtrack.boilerplate.springboot.model.ForumPost;

public interface ForumPostRepository extends JpaRepository<ForumPost, Long> {
    
}