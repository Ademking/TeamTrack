package com.teamtrack.boilerplate.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Example;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamtrack.boilerplate.springboot.model.Leave;
import com.teamtrack.boilerplate.springboot.model.LeaveTypes;
import com.teamtrack.boilerplate.springboot.model.Mission;
import com.teamtrack.boilerplate.springboot.model.MissionStatus;
import com.teamtrack.boilerplate.springboot.model.Team;
import com.teamtrack.boilerplate.springboot.repository.LeaveRepository;
import com.teamtrack.boilerplate.springboot.repository.MissionRepository;
import com.teamtrack.boilerplate.springboot.repository.TeamsRepository;
import com.teamtrack.boilerplate.springboot.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/stats")
public class StatsController {

    private final UserRepository userRepository;
    private final LeaveRepository leaveRepository;
    private final MissionRepository missionRepository;
    private final TeamsRepository teamsRepository;

    @GetMapping()
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("nb_users", userRepository.count());
        stats.put("nb_leaves", leaveRepository.count());
        stats.put("nb_missions", missionRepository.count());

        // MISSION STATS
        Mission missionPlanned = new Mission();
        missionPlanned.setMissionStatus(MissionStatus.PLANNED);
        Mission missionInProgress = new Mission();
        missionInProgress.setMissionStatus(MissionStatus.IN_PROGRESS);
        Mission missionCompleted = new Mission();
        missionCompleted.setMissionStatus(MissionStatus.COMPLETED);
        Mission missionCancelled = new Mission();
        missionCancelled.setMissionStatus(MissionStatus.CANCELLED);
        Long countPlanned = missionRepository.count(Example.of(missionPlanned));
        Long countInProgress = missionRepository.count(Example.of(missionInProgress));
        Long countCompleted = missionRepository.count(Example.of(missionCompleted));
        Long countCancelled = missionRepository.count(Example.of(missionCancelled));
        // group mission stats in a map
        Map<String, Long> missions_status = new HashMap<>();
        missions_status.put("planned", countPlanned);
        missions_status.put("in_progress", countInProgress);
        missions_status.put("completed", countCompleted);
        missions_status.put("cancelled", countCancelled);
        stats.put("missions", missions_status);
        // END MISSION STATS

        

        // TEAM STATS
        List<Team> teams = teamsRepository.findAll();
        Map<String, Integer> teamStats = new HashMap<>();
        // get the number of users in each team
        for (Team team : teams) {
            int teamSize = team.getUsers().size();
            teamStats.put(team.getName(), teamSize);
        }
        stats.put("teams", teamStats);
        // END TEAM STATS


        // LEAVES STATS
        Leave annualLeave = new Leave();
        annualLeave.setType(LeaveTypes.ANNUAL_LEAVE);
        Leave sickLeave = new Leave();
        sickLeave.setType(LeaveTypes.SICK_LEAVE);
        Leave maternityLeave = new Leave();
        maternityLeave.setType(LeaveTypes.MATERNITY_LEAVE);
        Long countAnnualLeave = leaveRepository.count(Example.of(annualLeave));
        Long countSickLeave = leaveRepository.count(Example.of(sickLeave));
        Long countMaternityLeave = leaveRepository.count(Example.of(maternityLeave));
        // group leaves stats in a map
        Map<String, Long> leaves_status = new HashMap<>();
        leaves_status.put("annual_leave", countAnnualLeave);
        leaves_status.put("sick_leave", countSickLeave);
        leaves_status.put("maternity_leave", countMaternityLeave);
        stats.put("leaves", leaves_status);
        // END LEAVES STATS



     
   
        return ResponseEntity.ok().body(stats);
    }

}