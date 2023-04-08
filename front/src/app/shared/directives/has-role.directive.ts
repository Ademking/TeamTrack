import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';


@Directive({
    selector: '[hasRole]'
})
export class HasRoleDirective {
    @Input() hasRole: string[] = [];

    constructor(private authService: AuthService,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) {
    }

    ngOnInit() {
        // check if this.authService.userRole() is in this.hasRoles
        if (this.hasRole.includes(this.authService.userRole())) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}

