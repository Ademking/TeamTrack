package com.teamtrack.boilerplate.springboot.service;

import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.teamtrack.boilerplate.springboot.model.Mission;
import com.teamtrack.boilerplate.springboot.model.User;
import com.teamtrack.boilerplate.springboot.repository.MissionRepository;
import com.teamtrack.boilerplate.springboot.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MissionService {

    private final MissionRepository missionRepository;
    private final UserRepository userRepository;

    public Mission addMission(Mission mission) {
        return missionRepository.save(mission);
    }

    public Mission updateMission(Long id, Mission mission) {
        Mission missionToUpdate = missionRepository.findById(id).get();
        missionToUpdate.setName(mission.getName());
        missionToUpdate.setDescription(mission.getDescription());
        missionToUpdate.setStartDate(mission.getStartDate());
        missionToUpdate.setEndDate(mission.getEndDate());
        missionToUpdate.setEndDate(mission.getEndDate());
        missionToUpdate.setMissionStatus(mission.getMissionStatus());
        return missionRepository.save(missionToUpdate);

    }

    public void deleteMission(Long id) {
        Mission missionToDelete = missionRepository.findById(id).get();
        missionRepository.delete(missionToDelete);
    }

    public List<Mission> getAllMissions() {
        return missionRepository.findAll();
    }

    public List<Mission> getMissionByUserId(Long userId) {
        User user = userRepository.findById(userId).get();
        List<Mission> missions = user.getMissions();
        return missions;
    }

    public Mission getMissionById(Long id) {
        return missionRepository.findById(id).get();
    }
}
