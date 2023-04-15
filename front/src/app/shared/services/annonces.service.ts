import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AnnoncesService {
    constructor(private httpClient: HttpClient) { }

    public getAllAnnonces() {
        return this.httpClient.get(`${environment.API_URL}/api/v1/annonces/all`);
    }

    public submitNewAnnonce(annonce: any) {
        return this.httpClient.post(`${environment.API_URL}/api/v1/annonces/add`, annonce);
    }

    public deleteAnnonce(id: number) {
        return this.httpClient.delete(`${environment.API_URL}/api/v1/annonces/delete/${id}`);
    }

    public updateAnnonce(id: any, annonce: any) {
        return this.httpClient.put(`${environment.API_URL}/api/v1/annonces/update/${id}`, annonce);
    }

}