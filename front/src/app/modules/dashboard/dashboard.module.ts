import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { SharedModule } from '../../shared/shared.module';
import { EmployeesComponent } from './pages/employees/employees.component';
import { CongeComponent } from './pages/conge/conge.component';
import { MissionsComponent } from './pages/missions/missions.component';
import { ForumComponent } from './pages/forum/forum.component';
import { ForumCardComponent } from './pages/forum/components/card.component';
import { FormationsComponent } from './pages/formations/formations.component';
import { AnnoncesComponent } from './pages/annonces/annonces.component';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';
import { TeamsComponent } from './pages/employees/components/teams/teams.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DemandeCongeComponent } from './pages/demande-conge/demande-conge.component';
import { MesDemandesCongeComponent } from './pages/mes-demandes-conge/mes-demandes-conge.component';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardLayoutComponent,
    EmployeesComponent,
    CongeComponent,
    MissionsComponent,
    ForumComponent,
    ForumCardComponent,
    FormationsComponent,
    AnnoncesComponent,
    MyprofileComponent,
    TeamsComponent,
    DashboardComponent,
    DemandeCongeComponent,
    MesDemandesCongeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ],
})
export class DashboardModule { }
