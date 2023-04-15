import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/core/role.guard';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { AnnoncesComponent } from './pages/annonces/annonces.component';
import { CongeComponent } from './pages/conge/conge.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DemandeCongeComponent } from './pages/demande-conge/demande-conge.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { FormationsComponent } from './pages/formations/formations.component';
import { ForumPostDetailsComponent } from './pages/forum-post-details/forum-post-details.component';
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
        component: HomeComponent, // Home page for employees
        canActivate: [
          RoleGuard,
        ],
        data: {
          roles: ['ROLE_EMPLOYEE'],
        },
      },
      {
        path: 'admin',
        component: DashboardComponent, // Home page for admin
        canActivate: [
          RoleGuard,
        ],
        data: {
          roles: ['ROLE_ADMIN'],
        },
      },
      {
        path: 'employees',
        component: EmployeesComponent,
        canActivate: [
          RoleGuard,
        ],
        data: {
          roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE'],
        },
      },
      {
        path: 'leave-management',
        component: CongeComponent,
        canActivate: [
          RoleGuard,
        ],
        data: {
          roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE'],
        },
      },
      {
        path: 'missions',
        component: MissionsComponent,
        canActivate: [
          RoleGuard,
        ],
        data: {
          roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE'],
        },
      },
      {
        path: 'forum',
        children: [
          {
            path: '',
            component: ForumComponent,
            canActivate: [
              RoleGuard,
            ],
            data: {
              roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE'],
            },
          },
          {
            path: ':id',
            component: ForumPostDetailsComponent,
            canActivate: [
              RoleGuard,
            ],
            data: {
              roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE'],
            },
          },
        ],
      },
      {
        path: 'training',
        component: FormationsComponent,
        canActivate: [
          RoleGuard,
        ],
        data: {
          roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE'],
        },
      },
      {
        path: 'announcements',
        component: AnnoncesComponent,
        canActivate: [
          RoleGuard,
        ],
        data: {
          roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE'],
        },
      },
      {
        path: 'my-profile',
        component: MyprofileComponent,
        canActivate: [
          RoleGuard,
        ],
        data: {
          roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE'],
        },
      },
      {
        path: 'mes-demandes-conge',
        component: MesDemandesCongeComponent,
        canActivate: [
          RoleGuard,
        ],
        data: {
          roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE'],
        },
      },
      {
        path: 'demande-conge',
        component: DemandeCongeComponent,
        canActivate: [
          RoleGuard,
        ],
        data: {
          roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE'],
        },
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
