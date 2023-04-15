import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class MissionsService {
    constructor(private httpClient: HttpClient) { }

    public getAllMissions() {
        return this.httpClient.get(environment.API_URL + '/api/v1/missions/all');
    }

    public createMission(mission: any) {
        return this.httpClient.post(environment.API_URL + '/api/v1/missions/add', mission);
    }

    public modifyMission(id: String, mission: any) {
        return this.httpClient.put(`${environment.API_URL}/api/v1/missions/update/${id}`, mission);
    }

    public deleteMission(id: String) {
        return this.httpClient.delete(`${environment.API_URL}/api/v1/missions/delete/${id}`);
    }
}