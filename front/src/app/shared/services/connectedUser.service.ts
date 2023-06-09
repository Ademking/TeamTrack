import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ConnectedUserService {
    constructor(private httpClient: HttpClient) { }

    public getMyProfile() {
        return this.httpClient.get(`${environment.API_URL}/api/v1/employees/me`);
    }   

}