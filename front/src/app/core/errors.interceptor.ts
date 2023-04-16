import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from './auth.service';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

    constructor(
        private parent: Injector,
        private auth: AuthService,
        private toast: HotToastService
    ) { }



    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        if (error.error.message !== "Bad credentials") {
                            this.toast.error("Votre session a expiré, veuillez vous reconnecter");
                            this.auth.logout();
                            return throwError(error);
                        }
                        return throwError(error);
                    }
                    else if (error.status === 403) {
                        this.toast.error("Vous n'avez pas les droits pour effectuer cette action");
                        return throwError(error);
                    }
                    else if (error.status === 500) {
                        this.toast.error("Une erreur est survenue, veuillez réessayer ultérieurement");
                        return throwError(error);
                    }
                    else {
                        return throwError(error);
                    }

                })
            )
    }


}