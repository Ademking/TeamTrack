import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { AnnoncesService } from 'src/app/shared/services/annonces.service';
import { ConnectedUserService } from 'src/app/shared/services/connectedUser.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {

  constructor(private annonceService: AnnoncesService, private connectedUserService: ConnectedUserService, private router: Router, private auth: AuthService) {
    if (this.auth.isAdmin()) {
      this.router.navigate(['/dashboard/admin']);
    }
   }

  ngOnInit(): void {
    this.greeting = this.getGreeting();
    this.getAnnounces();

    this.connectedUserService.getMyProfile().subscribe((user) => {
      this.user = user;
    });
  }
  user: any;
  greeting = 'Bonjour';
  annoncesList: any[] = [];

  // say "Bonjour" or "Bonsoir" depending on the time of the day
  getGreeting() {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Bonjour';
    } else if (currentHour < 18) {
      return 'Bon après-midi';
    } else {
      return 'Bonsoir';
    }
  }


  // generate a random color for the user avatar background based on the first letter of his first name
  // use tailwindcss background color classes
  generateRandomColor(name: string) {
    let firstLetter = name
    let colors = ['bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500'];
    let index = firstLetter.charCodeAt(0) % colors.length;
    return colors[index];
  }


  getAnnounces() {
    this.annonceService.getAllAnnonces().subscribe((annonces: any) => {
      this.annoncesList = annonces.reverse();
    });
  }

  calculateDuration(dateDebut: Date, dateFin: Date) {
    let date1 = new Date(dateDebut);
    let date2 = new Date(dateFin);
    let diff = Math.abs(date2.getTime() - date1.getTime());
    let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays;
  }

  openRoute(route: string) {
    this.router.navigate([route]);
  }

}
