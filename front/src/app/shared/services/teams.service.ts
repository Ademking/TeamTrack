import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class TeamsService {
    constructor(private httpClient: HttpClient) { }
    
    public getAllTeams() {
        return this.httpClient.get(environment.API_URL + '/api/v1/teams/all');
    }

    public addTeam(team: any) {
        return this.httpClient.post(environment.API_URL + '/api/v1/teams/add', team);
    }

    public deleteTeam(teamId: string) {
        return this.httpClient.delete(environment.API_URL + '/api/v1/teams/delete/' + teamId);
    }
}