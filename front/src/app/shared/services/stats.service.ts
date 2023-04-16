import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class StatsService {
    constructor(private httpClient: HttpClient) { }


    public getAllStats() {
        return this.httpClient.get(`${environment.API_URL}/api/v1/stats`);
    }

}