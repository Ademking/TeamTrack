import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LeaveService {
    updateLeaveStatus(id: any, status: { leaveStatus: any; }) {
        return this.httpClient.put(environment.API_URL + '/api/v1/leaves/change-status/' + id, status);
    }
    constructor(private httpClient: HttpClient) { }

    public postLeaveDemand(leave: any) {
        return this.httpClient.post(environment.API_URL + '/api/v1/leaves/demand', leave);
    }

    public getMyLeaveDemands() {
        return this.httpClient.get(environment.API_URL + '/api/v1/leaves/my-demands');
    }

    public getAllLeaves() {
        return this.httpClient.get(environment.API_URL + '/api/v1/leaves/all');
    }
}