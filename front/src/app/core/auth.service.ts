import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HotToastService } from '@ngneat/hot-toast';

interface User {
  email: String;
  password: String
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private httpClient: HttpClient, public router: Router, private msg: HotToastService) { }


  login(user: User) {
    return this.httpClient.post<any>(`${environment.API_URL}/login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
        localStorage.setItem('user', JSON.stringify({
          id: res.user.id,
          firstname: res.user.firstname,
          lastname: res.user.lastname,
          email: res.user.email,
          gender: res.user.gender,
          userRole: res.user.userRole,
          job: res.user.job,
        }))

        if (res.user.userRole == 'ROLE_EMPLOYEE') {
          this.msg.success("Connexion réussie. Bienvenue " + res.user.firstname);
          this.router.navigate(['/dashboard/'])
        }
        else if (res.user.userRole == 'ROLE_ADMIN') {
          this.router.navigate(['dashboard/admin'])
        }
      },
        (err: HttpErrorResponse) => {
          // show error message
          this.msg.error("Login ou mot de passe incorrect");
        }
      )
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getCurrentUser() {
    const item = window.localStorage.getItem('user');
    return item ? JSON.parse(item) : [];
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  userRole() {
    let user = this.getCurrentUser();
    return user.userRole;
  }

  isAdmin() {
    console.log(this.userRole() === 'ROLE_ADMIN');
    return this.userRole() === 'ROLE_ADMIN';
  }

  isEmployee() {
    return this.userRole() === 'ROLE_EMPLOYEE';
  }

  getUserId() {
    let user = this.getCurrentUser();
    return user.id;
  }

}