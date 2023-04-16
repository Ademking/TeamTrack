package com.teamtrack.boilerplate.springboot.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.teamtrack.boilerplate.springboot.model.Leave;
import com.teamtrack.boilerplate.springboot.model.LeaveStatus;
import com.teamtrack.boilerplate.springboot.repository.LeaveRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LeaveService {

    private final LeaveRepository leaveRepository;

    public List<Leave> getAllLeaves() {
        return leaveRepository.findAll();
    }

    public Leave getLeaveById(Long id) {
        return leaveRepository.findById(id).get();
    }

    public Leave changeLeaveStatus(Long id, LeaveStatus status) {
        Leave leave = leaveRepository.findById(id).get();
        leave.setLeaveStatus(status);
        return leaveRepository.save(leave);
    }

    public Leave addLeave(Leave leave) {
        return leaveRepository.save(leave);
    }

    public Leave updateLeave(Long id, Leave leave) {
        Leave leaveToUpdate = leaveRepository.findById(id).get();
        leaveToUpdate.setStartDate(leave.getStartDate());
        leaveToUpdate.setEndDate(leave.getEndDate());
        leaveToUpdate.setType(leave.getType());
        leaveToUpdate.setReason(leave.getReason());
        leaveToUpdate.setUser(leave.getUser());
        leaveToUpdate.setLeaveStatus(leave.getLeaveStatus());
        return leaveRepository.save(leaveToUpdate);
    }

    public void deleteLeave(Long id) {
        leaveRepository.deleteById(id);
    }
    
}
