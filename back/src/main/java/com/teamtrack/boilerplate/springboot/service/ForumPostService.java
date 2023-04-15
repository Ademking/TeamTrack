package com.teamtrack.boilerplate.springboot.service;

import java.util.List;

import javax.validation.Valid;

import org.springframework.stereotype.Service;

import com.teamtrack.boilerplate.springboot.model.ForumComment;
import com.teamtrack.boilerplate.springboot.model.ForumPost;
import com.teamtrack.boilerplate.springboot.repository.ForumCommentRepository;
import com.teamtrack.boilerplate.springboot.repository.ForumPostRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ForumPostService {

    private final ForumPostRepository forumPostRepository;
    private final ForumCommentRepository forumCommentRepository;

    public List<ForumPost> getAllForumPosts() {
        return forumPostRepository.findAll();
    }

    public ForumPost addForumPost(ForumPost forumPost) {
        return forumPostRepository.save(forumPost);
    }

    public ForumPost getForumPostById(Long id) {
        return forumPostRepository.findById(id).orElse(null);
    }
    
    public ForumComment addComment(ForumComment comment) {
        return forumCommentRepository.save(comment);
    }

    public ForumComment getCommentById(Long commentId) {
        return forumCommentRepository.findById(commentId).orElse(null);
    }

    public void deleteComment(Long commentId) {
        forumCommentRepository.deleteById(commentId);
    }
}
