import { Component, TemplateRef } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
    selector: 'app-template-renderer',
    template: `
    <ng-container
      *ngTemplateOutlet="template; context: templateContext"
    ></ng-container>
  `
})
export class TemplateRendererComponent implements ICellRendererAngularComp {
    template: TemplateRef<any> = null as any;
    templateContext: { $implicit: any, params: any } = { $implicit: null, params: null };

    refresh(params: any): boolean {
        this.templateContext = {
            $implicit: params.data,
            params: params
        };
        return true;
    }

    agInit(params: any): void {
        this.template = params['ngTemplate'];
        this.refresh(params);
    }
}
