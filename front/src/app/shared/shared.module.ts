import { NgModule, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SidebarService } from './services/sidebar.service';
import { AnnoncesService } from './services/annonces.service';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer.component';
import { AgGridModule } from 'ag-grid-angular';
import { UsersService } from './services/users.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { MultiSelectModule } from 'primeng/multiselect';
import { HotToastModule } from '@ngneat/hot-toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ConfirmationService } from 'primeng/api';

import { TemplateRendererComponent } from './components/template-renderer.component';
import { HasRoleDirective } from './directives/has-role.directive';

const DIRECTIVES = [
  HasRoleDirective
];

const COMPONENTS = [
  FooterComponent,
  TemplateRendererComponent
];

const PIPES = [
  SafeHtmlPipe
];

const SERVICES = [
  SidebarService,
  AnnoncesService,
  UsersService,
  DialogService,
  ConfirmationService,
];

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  DialogModule,
  OverlayPanelModule,
  InputMaskModule,
  DynamicDialogModule,
  InputTextModule,
  PasswordModule,
  AgGridModule,
  SelectButtonModule,
  InputTextareaModule,
  DropdownModule,
  CalendarModule,
  ConfirmDialogModule,
  TooltipModule,
  MultiSelectModule,
  HotToastModule.forRoot(
    {
      position: 'top-right',
    }
  )
] as any[];


@NgModule({
  declarations: [
    ...DIRECTIVES,
    ...COMPONENTS,
    ...PIPES,
  ],
  imports: [
    ...MODULES,
  ],
  exports: [
    ...DIRECTIVES,
    ...COMPONENTS,
    ...PIPES,
    ...MODULES
  ],
  providers: [
    ...SERVICES,
  ],
})
export class SharedModule { }
