import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { ConnectedUserService } from 'src/app/shared/services/connectedUser.service';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
type SidebarItem = { title: string, path: string, icon: string };

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
  animations: [
    trigger('AnimationTrigger0', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms ease', style({ opacity: 0 }))
      ])
    ]),
    trigger('AnimationTrigger1', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate('300ms ease-in-out', style({ transform: 'translateX(-100%)' }))
      ])
    ]),
    trigger('AnimationTrigger2', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class DashboardLayoutComponent implements OnInit {


  menuItems: SidebarItem[] = [];
  constructor(private sidebarService: SidebarService, private connectedUserService: ConnectedUserService, private authService: AuthService) {
    this.menuItems = this.sidebarService.getSidebarItems();

    let user = this.authService.getCurrentUser();

    if (user.userRole == 'ROLE_EMPLOYEE') {
      this.menuItems = this.sidebarService.getSidebarItems();
    }
    else if (user.userRole == 'ROLE_ADMIN') {
      this.menuItems = this.sidebarService.getSidebarItemsAdmin();
    }

    this.user = {
      firstname: user.firstname,
      lastname: user.lastname,
      gender: user.gender,
      id: user.id,
      email: user.email,
      role: user.userRole,
      avatar: 'assets/imgs/avatar.png'
    }

  }

  ngOnInit(): void {
  }

  isOffCanvasMenu = false;
  toggleOffCanvasMenu() {
    this.isOffCanvasMenu = !this.isOffCanvasMenu;
  }

  user: any;
  logo: string = 'assets/imgs/logo-light.png'

  logout() {
    this.authService.logout();
  }

  // generate a random color for the user avatar background based on the first letter of his first name
  // use tailwindcss background color classes
  generateRandomColor(name: string) {
    let firstLetter = name

    let colors = ['bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500'];
    let index = firstLetter.charCodeAt(0) % colors.length;
    return colors[index];
  }

}
