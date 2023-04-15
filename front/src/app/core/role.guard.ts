import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from './auth.service';

type Role = 'ROLE_ADMIN' | 'ROLE_EMPLOYEE';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

    constructor(private authService: AuthService, private msg: HotToastService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const roles = route.data['roles'] as Role[];
        // user role
        const userRole = this.authService.userRole();
        if (roles.includes(userRole)) {
            console.log('user role is ok');
            return true;
        }
        this.msg.error('Vous n\'avez pas les droits pour accéder à cette page');
        this.authService.logout();
        return false;
    }
}