import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ConnectedUserService {
    constructor(private httpClient: HttpClient) { }

    public getMyProfile() {
        return this.httpClient.get('assets/mock/me.json');
    }

}