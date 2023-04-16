package com.teamtrack.boilerplate.springboot.service;

import java.util.List;

import javax.validation.Valid;

import org.springframework.stereotype.Service;

import com.teamtrack.boilerplate.springboot.model.Team;
import com.teamtrack.boilerplate.springboot.model.User;
import com.teamtrack.boilerplate.springboot.repository.TeamsRepository;
import com.teamtrack.boilerplate.springboot.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class TeamsService {

    private final TeamsRepository teamsRepository;
    private final UserRepository employeesRepository;

    // get all teams
    public List<Team> getAllTeams() {
        return teamsRepository.findAll();
    }

    public Team getTeamById(Long id) {
        return teamsRepository.findById(id).get();
    }

    public Team addTeam(Team team) {
        return teamsRepository.save(team);
    }

    public Team updateTeam(Long id, Team team, List<Long> employeeIds) {
        Team teamToUpdate = teamsRepository.findById(id).get();
        teamToUpdate.setName(team.getName());
        teamToUpdate.setDescription(team.getDescription());

        // get employees by team id
        List<User> employeesOfTeam = employeesRepository.findByTeamId(id).orElse(null);
        // for each employee, set team to null
        employeesOfTeam.forEach(employee -> {
            employee.setTeam(null);
        });
        // save employees
        employeesRepository.saveAll(employeesOfTeam);
        teamsRepository.save(teamToUpdate);


        List<User> newEmployees = employeesRepository.findAllById(employeeIds);
        newEmployees.forEach(employee -> {
            employee.setTeam(teamToUpdate);
        });
        if (newEmployees.size() > 0) {
            employeesRepository.saveAll(newEmployees);
        }
        employeesRepository.saveAll(newEmployees);
        teamsRepository.save(teamToUpdate);
        return teamToUpdate;



        
    }

    public void deleteTeam(Long id) {
        // get employees by team id
        List<User> employees = employeesRepository.findByTeamId(id).orElse(null);
        // for each employee, set team to null
        employees.forEach(employee -> {
            employee.setTeam(null);
        });
        // save employees
        employeesRepository.saveAll(employees);
        // delete team
        teamsRepository.deleteById(id);
    }

    public Team addEmployeesToTeam(Long teamId, List<Long> employeeIds) {
        // get team by id
        Team team = teamsRepository.findById(teamId).get();
        // get employees by ids
        List<User> employees = employeesRepository.findAllById(employeeIds);
        // for each employee, add team to employee
        employees.forEach(employee -> {
            employee.setTeam(team);
        });
        // save employees
        employeesRepository.saveAll(employees);
        // return team
        return team;
    }

    public Team createNewTeam(@Valid Team team, List<Long> employeeIds) {
        Team newTeam = addTeam(team);
        List<User> employees = employeesRepository.findAllById(employeeIds);
        employees.forEach(employee -> {
            employee.setTeam(newTeam);
        });
        if (employees.size() > 0) {
            employeesRepository.saveAll(employees);
        }
        return newTeam;
    }

}
