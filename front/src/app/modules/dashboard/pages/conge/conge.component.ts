import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ConfirmationService } from 'primeng/api';
import localeText from 'src/app/core/ag-grid-i18n';
import { TemplateRendererComponent } from 'src/app/shared/components/template-renderer.component';
import { LeaveService } from 'src/app/shared/services/leave.service';

@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.scss']
})
export class CongeComponent implements OnInit {

  leaves: any[] = [];
  constructor(private leaveService: LeaveService, private fb: FormBuilder, private msg: HotToastService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.loadAllLeaves();
  }

  loadAllLeaves() {
    this.leaveService.getAllLeaves().subscribe(
      (data: any) => {
        this.leaves = data.reverse();
        this.gridOptions.api!.setRowData(this.leaves);
      },
    );
  }

  @ViewChild('actions') actionsElement!: TemplateRef<any>;

  columnDefs: ColDef[] = [];
  rowData = [];

  gridOptions: GridOptions = {
    columnDefs: this.columnDefs,
    rowHeight: 60,
    pagination: true,
    localeText: localeText,
    onGridReady: (params: GridReadyEvent) => {
      //params.api.sizeColumnsToFit();
    },
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true,
      floatingFilter: true,
    },
  };


  @ViewChild('statusElem') statusElem!: TemplateRef<any>;

  ngAfterViewInit(): void {
    this.gridOptions.api!.setColumnDefs([
      {
        field: 'leaveStatus', headerName: 'Statut',
        colId: 'leaveStatus',
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.statusElem
        },
        sortable: false, filter: false, resizable: true, maxWidth: 250,
        cellStyle: {
          'text-align': 'center', 'padding-left': '0px', 'padding-right': '0px', 'height': '100%',
          'display': 'flex ',
          'justify-content': 'center',
          'align-items': 'center ',
        }
      },
      { field: 'startDate', headerName: 'Date de début' },
      { field: 'endDate', headerName: 'Date de fin' },
      {
        field: 'duration', headerName: 'Durée', valueGetter: (params) => {
          let startDate = new Date(params.data.startDate);
          let endDate = new Date(params.data.endDate);
          let duration = endDate.getTime() - startDate.getTime();
          let days = Math.floor(duration / (1000 * 60 * 60 * 24));
          return days + ' jours';
        }
      },
      {
        field: 'type', headerName: 'Type', valueGetter: (params) => {
          /**
           *     ANNUAL_LEAVE, MATERNITY_LEAVE, SICK_LEAVE
           */
          switch (params.data.type) {
            case 'ANNUAL_LEAVE':
              return 'Congé annuel';
            case 'MATERNITY_LEAVE':
              return 'Congé maternité';
            case 'SICK_LEAVE':
              return 'Congé maladie';
            default:
              return 'Inconnu';
          }
        }
      },
      { field: 'reason', headerName: 'Raison', minWidth: 300 },
      { field: 'comment', headerName: 'Commentaire', minWidth: 300 },
      { field: 'dateCreated', headerName: 'Date de la demande', valueGetter: (params) => new Date(params.data.dateCreated).toLocaleDateString() + ' ' + new Date(params.data.dateCreated).toLocaleTimeString() },
      { field: 'lastUpdated', headerName: 'Dernière mise à jour', valueGetter: (params) => new Date(params.data.lastUpdated).toLocaleDateString() + ' ' + new Date(params.data.lastUpdated).toLocaleTimeString() },
      {
        field: 'actions',
        headerName: 'Actions',
        colId: 'actions',
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.actionsElement
        },
        pinned: 'right',
        sortable: false, filter: false, resizable: true, maxWidth: 150,
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

  displayDetailsModal = false;
  selectedLeave: any;
  openDetails(row: any) {
    this.displayDetailsModal = true;
    this.selectedLeave = row;
  }

  openEdit(row: any) {

  }

  deleteConge(id: string) {

  }


  getDuration(startDate: any, endDate: any) {
    let start = new Date(startDate);
    let end = new Date(endDate);
    let duration = end.getTime() - start.getTime();
    let days = Math.floor(duration / (1000 * 60 * 60 * 24));
    return days;
  }


  getLeaveType(type: any) {
    switch (type) {
      case 'ANNUAL_LEAVE':
        return 'Congé annuel';
      case 'MATERNITY_LEAVE':
        return 'Congé maternité';
      case 'SICK_LEAVE':
        return 'Congé maladie';
      default:
        return 'Inconnu';
    }
  }

  selectedLeaveStatus: any;
  statusOptions = [
    { label: 'En attente', value: 'PENDING' },
    { label: 'Accepté', value: 'ACCEPTED' },
    { label: 'Refusé', value: 'REJECTED' },
  ];

  displayStatusModal = false;
  changeStatus(row: any) {
    this.selectedLeave = row;
    this.selectedLeaveStatus = row.leaveStatus;
    this.displayStatusModal = true;
  }

  submitChangeStatus(ev: any) {

    this.leaveService.updateLeaveStatus(this.selectedLeave.id, {
      leaveStatus: this.selectedLeaveStatus
    }).subscribe(
      (data: any) => {
        this.msg.success('Statut modifié avec succès');
        this.loadAllLeaves();
        this.displayStatusModal = false;
      },
      (error: any) => {
        this.msg.error('Une erreur est survenue');
      }
    );
  }

};
