import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UsersService {
    constructor(private httpClient: HttpClient) { }

    public getAllUsers() {
        return this.httpClient.get(environment.API_URL + '/api/v1/employees/all');
    }

    public addUser(user: any) {
        return this.httpClient.post(environment.API_URL + '/register', user);
    }

    public deleteUser(userId: string) {
        return this.httpClient.delete(environment.API_URL + '/api/v1/employees/delete/' + userId);
    }

    public updateUser(userId: string, user: any) {
        return this.httpClient.put(environment.API_URL + '/api/v1/employees/update/' + userId, user);
    }
}