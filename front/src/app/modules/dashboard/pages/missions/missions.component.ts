import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, CellClickedEvent, GridApi, GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { TemplateRendererComponent } from 'src/app/shared/components/template-renderer.component';
import { MissionsService } from 'src/app/shared/services/missions.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {


  ngOnInit(): void { }
  @ViewChild('actions') actionsElement!: TemplateRef<any>;
  missions: any[] = [];

  columnDefs: ColDef[] = [];
  rowData = [];

  gridOptions: GridOptions = {
    columnDefs: this.columnDefs,
    rowHeight: 60,
    onGridReady: (params: GridReadyEvent) => {
      params.api.sizeColumnsToFit();
    },
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true,
      floatingFilter: true,
    },
  };

  ngAfterViewInit(): void {
    this.gridOptions.api!.setColumnDefs([
      {
        field: 'name',
      },
      { field: 'description' },
      { field: 'status' },
      { field: 'created_at' },
      {
        field: 'actions',
        headerName: 'Actions',
        colId: 'actions',
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.actionsElement
        },

        sortable: false, filter: false, resizable: true, maxWidth: 200,
        cellStyle: {
          'text-align': 'center', 'padding-left': '0px', 'padding-right': '0px', 'height': '100%',
          'display': 'flex ',
          'justify-content': 'center',
          'align-items': 'center ',
        }

      },
    ]);

    this.gridOptions.api!.showLoadingOverlay();
  }

  constructor(private missionsService: MissionsService) {
    this.missionsService.getAllMissions().subscribe((missions: any) => {
      this.missions = missions;
      this.gridOptions.api?.setRowData(this.missions);
    }
    );
  }




}
