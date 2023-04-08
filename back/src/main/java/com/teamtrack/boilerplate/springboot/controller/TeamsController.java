package com.teamtrack.boilerplate.springboot.controller;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamtrack.boilerplate.springboot.model.Team;
import com.teamtrack.boilerplate.springboot.model.User;
import com.teamtrack.boilerplate.springboot.security.service.UserService;
import com.teamtrack.boilerplate.springboot.service.TeamsService;
import com.fasterxml.jackson.databind.node.ObjectNode;

import lombok.RequiredArgsConstructor;
import com.teamtrack.boilerplate.springboot.service.TeamsService;

import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/teams")
public class TeamsController {

    private final TeamsService teamsService;
    private final UserService userService;

    @GetMapping("/all")
    public ResponseEntity<List<Team>> getAllTeams() {
        List<Team> teams = teamsService.getAllTeams();
        return ResponseEntity.ok().body(teams);
    }

    // the request contains a team object and list of employee ids

    @PostMapping("/add")
    public ResponseEntity<?> addTeam(@Valid @RequestBody TeamAndEmployeeIds teamAndEmployeeIds) {
        Team addedTeam = teamsService.createNewTeam(teamAndEmployeeIds.team, teamAndEmployeeIds.employeesIds);
        return ResponseEntity.ok().body(addedTeam);
    }

    private static class TeamAndEmployeeIds {
        public Team team;
        public List<Long> employeesIds;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Team> updateTeam(@PathVariable(value = "id") Long teamId, @Valid @RequestBody Team team) {
        Team updatedTeam = teamsService.updateTeam(teamId, team);
        return ResponseEntity.ok().body(updatedTeam);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Team> getTeamById(@PathVariable(value = "id") Long teamId) {
        Team team = teamsService.getTeamById(teamId);
        return ResponseEntity.ok().body(team);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Team> deleteTeam(@PathVariable(value = "id") Long teamId) {
        teamsService.deleteTeam(teamId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/employees")
    public ResponseEntity<?> addEmployeesToTeam(@PathVariable(value = "id") Long teamId,
            @Valid @RequestBody List<Long> employeeIds) {
        Team team = teamsService.getTeamById(teamId);
        teamsService.addEmployeesToTeam(teamId, employeeIds);
        return ResponseEntity.ok().body(team);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTeamById(@PathVariable(value = "id") Long teamId) {
        teamsService.deleteTeam(teamId);
        return ResponseEntity.ok().build();
    }

}
