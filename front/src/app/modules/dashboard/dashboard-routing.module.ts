import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { AnnoncesComponent } from './pages/annonces/annonces.component';
import { CongeComponent } from './pages/conge/conge.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DemandeCongeComponent } from './pages/demande-conge/demande-conge.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { FormationsComponent } from './pages/formations/formations.component';
import { ForumComponent } from './pages/forum/forum.component';
import { HomeComponent } from './pages/home/home.component';
import { MesDemandesCongeComponent } from './pages/mes-demandes-conge/mes-demandes-conge.component';
import { MissionsComponent } from './pages/missions/missions.component';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'admin',
        component: DashboardComponent,
      },
      {
        path: 'employees',
        component: EmployeesComponent,
      },
      {
        path: 'leave-management',
        component: CongeComponent,
      },
      {
        path: 'missions',
        component: MissionsComponent,
      },
      {
        path: 'forum',
        component: ForumComponent,
      },
      {
        path: 'training',
        component: FormationsComponent,
      },
      {
        path: 'announcements',
        component: AnnoncesComponent,
      },
      {
        path: 'my-profile',
        component: MyprofileComponent,
      },
      {
        path: 'mes-demandes-conge',
        component: MesDemandesCongeComponent,
      },
      {
        path: 'demande-conge',
        component: DemandeCongeComponent,
      },


    ],
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
