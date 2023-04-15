package com.teamtrack.boilerplate.springboot.controller;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamtrack.boilerplate.springboot.model.ForumComment;
import com.teamtrack.boilerplate.springboot.model.ForumPost;
import com.teamtrack.boilerplate.springboot.model.User;
import com.teamtrack.boilerplate.springboot.repository.UserRepository;
import com.teamtrack.boilerplate.springboot.security.service.UserService;
import com.teamtrack.boilerplate.springboot.service.ForumPostService;

import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/forum")
public class ForumPostController {

    private final ForumPostService forumPostService;
    private final UserService userService;
    private final UserRepository userRepository;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_EMPLOYEE') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<ForumPost>> getAllForumPosts() {
        List<ForumPost> forumPosts = forumPostService.getAllForumPosts();
        return ResponseEntity.ok().body(forumPosts);
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_EMPLOYEE') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<ForumPost> addForumPost(@Valid @RequestBody ForumPostRequest req) {

        ForumPost forumPost = req.getForumPost();
        Long userId = req.getUserId();
        User user = userService.getUserById(userId);

        ForumPost newForumPost = new ForumPost();
        newForumPost.setTitle(forumPost.getTitle());
        newForumPost.setCategory(forumPost.getCategory());
        newForumPost.setContent(forumPost.getContent());
        newForumPost.setUser(user);

        forumPostService.addForumPost(newForumPost);

        return ResponseEntity.ok().body(newForumPost);
    }

    private static class ForumPostRequest {
        private Long userId;
        private ForumPost forumPost;

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public ForumPost getForumPost() {
            return forumPost;
        }

        public void setForumPost(ForumPost forumPost) {
            this.forumPost = forumPost;
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_EMPLOYEE') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<ForumPost> getForumPostById(@Valid @PathVariable Long id) {
        ForumPost forumPost = forumPostService.getForumPostById(id);
        return ResponseEntity.ok().body(forumPost);
    }

    @PostMapping("/comment/{id}")
    @PreAuthorize("hasRole('ROLE_EMPLOYEE') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<ForumPost> addComment(@Valid @PathVariable(value = "id") Long forumId,
            @Valid @RequestBody ForumComment comment) {
        // conntected user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String userEmail = userDetails.getUsername();
        User user = userRepository.findByEmail(userEmail);

        ForumComment newComment = new ForumComment();
        ForumPost forumPost = forumPostService.getForumPostById(forumId);
        newComment.setContent(comment.getContent());
        newComment.setForumPost(forumPost);
        newComment.setCreated_by(user);
        forumPostService.addComment(newComment);
        return ResponseEntity.ok().body(forumPost);
    }

    @DeleteMapping("/comment/{id}")
    @PreAuthorize("hasRole('ROLE_EMPLOYEE') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteComment(@Valid @PathVariable(value = "id") Long commentId) {
        // conntected user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String userEmail = userDetails.getUsername();
        User user = userRepository.findByEmail(userEmail);

        ForumComment comment = forumPostService.getCommentById(commentId);
        ForumPost forumPost = comment.getForumPost();
        if (comment.getCreated_by().getId() == user.getId()) {
            forumPostService.deleteComment(commentId);
        }
        return ResponseEntity.ok().body(Map.of("message", "Comment deleted successfully"));
    }

}
