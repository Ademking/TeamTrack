package com.teamtrack.boilerplate.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamtrack.boilerplate.springboot.model.Leave;
import com.teamtrack.boilerplate.springboot.model.LeaveStatus;
import com.teamtrack.boilerplate.springboot.model.User;
import com.teamtrack.boilerplate.springboot.repository.UserRepository;
import com.teamtrack.boilerplate.springboot.service.EmailService;
import com.teamtrack.boilerplate.springboot.service.LeaveService;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/leaves")
public class LeaveController {

    private final LeaveService leaveService;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Leave>> getAllLeaves() {
        List<Leave> leaves = leaveService.getAllLeaves();
        return ResponseEntity.ok().body(leaves);
    }

    @GetMapping("/my-demands")
    @PreAuthorize("hasRole('ROLE_EMPLOYEE') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Leave>> getMyLeaves() {
        // Connected User
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String userEmail = userDetails.getUsername();
        User user = userRepository.findByEmail(userEmail);

        List<Leave> leaves = user.getLeaves();
        return ResponseEntity.ok().body(leaves);
    }

    @PostMapping("/demand")
    @PreAuthorize("hasRole('ROLE_EMPLOYEE') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<Leave> addLeave(@Valid @RequestBody Leave leave) {

        // Connected User
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String userEmail = userDetails.getUsername();
        User user = userRepository.findByEmail(userEmail);

        Leave newLeave = new Leave();
        newLeave.setStartDate(leave.getStartDate());
        newLeave.setEndDate(leave.getEndDate());
        newLeave.setType(leave.getType());
        newLeave.setReason(leave.getReason());
        newLeave.setComment(leave.getComment());
        newLeave.setUser(user);
        newLeave.setLeaveStatus(LeaveStatus.PENDING);
        return ResponseEntity.ok().body(leaveService.addLeave(newLeave));
    }

    @PutMapping("/change-status/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> changeLeaveStatus(@Valid @PathVariable("id") Long id,
            @RequestBody LeaveStatusRequest leaveStatusRequest) {

        Leave leaveToChange = leaveService.getLeaveById(id);
        User user = leaveToChange.getUser();


        String[] recipient = { user.getEmail() };
        String subject = "Changement de statut de votre demande de congé";
        String body = "Bonjour " + user.getFirstname() + " " + user.getLastname() + ",\r\r" + "Votre demande de congé du " + leaveToChange.getStartDate() + " au " + leaveToChange.getEndDate() + " a été traitée. Vous pouvez consulter le statut de votre demande sur votre espace personnel.\r\r" + "Cordialement,\r" + "L'équipe TeamTrack";

        emailService.sendEmail(recipient, subject, body);

        Leave leave = leaveService.changeLeaveStatus(id, leaveStatusRequest.getLeaveStatus());
        return ResponseEntity.ok().body(leave);
    }

    private static class LeaveStatusRequest {
        private LeaveStatus leaveStatus;

        public LeaveStatus getLeaveStatus() {
            return leaveStatus;
        }

        public void setLeaveStatus(LeaveStatus leaveStatus) {
            this.leaveStatus = leaveStatus;
        }
    }

}
