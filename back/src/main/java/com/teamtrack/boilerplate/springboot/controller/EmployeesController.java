package com.teamtrack.boilerplate.springboot.controller;

import java.util.List;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.teamtrack.boilerplate.springboot.security.dto.LoginRequest;
import com.teamtrack.boilerplate.springboot.security.dto.LoginResponse;
import com.teamtrack.boilerplate.springboot.security.jwt.JwtTokenService;
import com.teamtrack.boilerplate.springboot.model.User;
import com.teamtrack.boilerplate.springboot.repository.UserRepository;
import com.teamtrack.boilerplate.springboot.security.service.UserService;

import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/employees")
public class EmployeesController {

    private final UserService userService;
    private final JwtTokenService jwtTokenService;
    private final UserRepository userRepository;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_EMPLOYEE') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<User>> getAllEmployees() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok().body(users);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<User> updateUser(@PathVariable(value = "id") Long userId, @Valid @RequestBody User user) {
        User updatedUser = userService.updateUser(userId, user);
        return ResponseEntity.ok().body(updatedUser);
    }

    @PutMapping("/update-my-profile")
    @PreAuthorize("hasRole('ROLE_EMPLOYEE') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateMyProfile(@Valid @RequestBody User user) {
        // Connected User
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String userEmail = userDetails.getUsername();
        User connectedUser = userRepository.findByEmail(userEmail);

        // Update User
        connectedUser.setFirstname(user.getFirstname());
        connectedUser.setLastname(user.getLastname());
        connectedUser.setPhone(user.getPhone());
        connectedUser.setEmail(user.getEmail());

        connectedUser.setAddress(user.getAddress());
        connectedUser.setGender(user.getGender());
        connectedUser.setBirthdate(user.getBirthdate());

        // Save User
        User updatedUser = userService.updateUser(connectedUser.getId(), connectedUser);

        return ResponseEntity.ok().body(updatedUser);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable(value = "id") Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/add")
    public ResponseEntity<User> addUser(@Valid @RequestBody User user) {
        User addedUser = userService.addUser(user);
        return ResponseEntity.ok().body(addedUser);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getConnectedUser() {
        // Connected User
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String userEmail = userDetails.getUsername();
        User user = userRepository.findByEmail(userEmail);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePassRequest changePassRequest) {

        // Connected User
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String userEmail = userDetails.getUsername();
        User user = userRepository.findByEmail(userEmail);

        if (!userService.checkIfValidOldPassword(user, changePassRequest.currentpass)) {
            return ResponseEntity.badRequest().body("Invalid current password");
        }
        User updatedUser = userService.changeUserPassword(user, changePassRequest.newpass);
        return ResponseEntity.ok().body(updatedUser);
    }

    private static class ChangePassRequest {
        public String currentpass;
        public String newpass;
    }

}
