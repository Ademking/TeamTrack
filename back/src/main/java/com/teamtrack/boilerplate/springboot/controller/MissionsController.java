package com.teamtrack.boilerplate.springboot.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamtrack.boilerplate.springboot.model.Mission;
import com.teamtrack.boilerplate.springboot.model.User;
import com.teamtrack.boilerplate.springboot.repository.MissionRepository;
import com.teamtrack.boilerplate.springboot.repository.UserRepository;
import com.teamtrack.boilerplate.springboot.security.service.UserService;
import com.teamtrack.boilerplate.springboot.service.EmailService;
import com.teamtrack.boilerplate.springboot.service.MissionService;

import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/missions")
public class MissionsController {

    private final MissionService missionService;
    private final MissionRepository missionRepository;
    private final UserService userService;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Mission>> getAllMissions() {
        List<Mission> missions = missionService.getAllMissions();
        return ResponseEntity.ok().body(missions);
    }

    // Get list of missions for a specific employee
    @GetMapping("/my")
    @PreAuthorize("hasRole('ROLE_EMPLOYEE') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Mission>> getMyMissions() {
        // get current user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String userEmail = userDetails.getUsername();
        User user = userRepository.findByEmail(userEmail);
        List<Mission> missions = user.getMissions();
        return ResponseEntity.ok().body(missions);
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addNewMission(@Valid @RequestBody MissionRequest missionReq) {

        Mission newMission = missionService.addMission(missionReq.getMission());
        List<User> employees = userService.getUsersByIds(missionReq.getEmployeesIds());
        String [] recipient = new String[employees.size()];
        // foreach employee, add the mission to his missions list
        for (User employee : employees) {
            List<Mission> missions = employee.getMissions();
            missions.add(newMission);
            employee.setMissions(missions);
            userService.updateUser(employee.getId(), employee);
            recipient[employees.indexOf(employee)] = employee.getEmail();
        }

        String subject = "Confirmation de mission";
        String body = "Bonjour,\r\rVous avez une nouvelle mission. Merci de consulter votre espace personnel pour plus de détails.\r\rCordialement,\rL'équipe TeamTrack";
        // send email to all employees
        emailService.sendEmail(recipient, subject, body);

        return ResponseEntity.ok().body(Map.of("message", "Mission added successfully"));
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateMission(@Valid @RequestBody MissionRequest missionReq,
            @PathVariable(value = "id") Long missionId) {
        // update mission
        Mission mission = missionReq.getMission();
        List<Long> userIds = missionReq.getEmployeesIds();
        Mission updatedMission = missionService.updateMission(missionId, mission);

        // remove mission from all employees
        List<User> users = userRepository.findAll();
        for (User user : users) {
            List<Mission> missions = user.getMissions();
            missions.removeIf(m -> m.getId().equals(missionId));
            user.setMissions(missions);
            userRepository.save(user);
        }

        // add mission to selected employees
        List<User> employees = userService.getUsersByIds(userIds);
        for (User employee : employees) {
            List<Mission> missions = employee.getMissions();
            missions.add(updatedMission);
            employee.setMissions(missions);
            userService.updateUser(employee.getId(), employee);
        }

        return ResponseEntity.ok().body(Map.of("message", "Mission updated successfully"));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteMission(@Valid @PathVariable(value = "id") Long missionId) {
        if (!missionRepository.existsById(missionId)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Mission not found"));
        }

        // remove this mission from all employees
        List<User> users = userRepository.findAll();
        for (User user : users) {
            List<Mission> missions = user.getMissions();
            missions.removeIf(m -> m.getId().equals(missionId));
            user.setMissions(missions);
            userRepository.save(user);
        }

        missionService.deleteMission(missionId);
        return ResponseEntity.ok().body(Map.of("message", "Mission deleted successfully"));
    }

    private static class MissionRequest {
        private List<Long> employeesIds;
        private Mission mission;

        public List<Long> getEmployeesIds() {
            return employeesIds;
        }

        public void setEmployeesIds(List<Long> employeesIds) {
            this.employeesIds = employeesIds;
        }

        public Mission getMission() {
            return mission;
        }

        public void setMission(Mission mission) {
            this.mission = mission;
        }
    }

}
