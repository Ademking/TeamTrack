import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AnnoncesService {
    constructor(private httpClient: HttpClient) { }

    public getAllAnnonces() {
        return this.httpClient.get('assets/mock/annonces.json');
    }
}