import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MissionsService {
    constructor(private httpClient: HttpClient) { }

    public getAllMissions() {
        return this.httpClient.get('assets/mock/missions.json');
    }
}