import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ErrorsInterceptor } from './errors.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [],
  providers: [
    {
      provide: AuthService,
    },
    {
      provide: AuthGuard,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorsInterceptor,
      multi: true
   }
  ],
})
export class CoreModule { }
