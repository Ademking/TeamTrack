import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import localeText from 'src/app/core/ag-grid-i18n';
import { TemplateRendererComponent } from 'src/app/shared/components/template-renderer.component';
import { AnnoncesService } from 'src/app/shared/services/annonces.service';
import { LeaveService } from 'src/app/shared/services/leave.service';

@Component({
  selector: 'app-mes-demandes-conge',
  templateUrl: './mes-demandes-conge.component.html',
  styleUrls: ['./mes-demandes-conge.component.scss']
})
export class MesDemandesCongeComponent implements OnInit {


  displayNewAnnonce: boolean = false;

  showDialog() {
    this.displayNewAnnonce = true;
  }

  submitNewAnnounce() {
    console.log('submitNewAnnounce');
    this.displayNewAnnonce = false;
  }

  newAnnonceForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    annonce: new FormControl('', [Validators.required]),
  });


  getMyData() {
    this.leaveService.getMyLeaveDemands().subscribe(
      (res: any) => {
        this.myLeaves = res.reverse();
        this.gridOptions.api!.setRowData(this.myLeaves);
        console.log(res);
      }
    );
  }

  ngOnInit(): void {
    this.getMyData();
  }


  @ViewChild('actions') actionsElement!: TemplateRef<any>;
  annonces: any[] = [];

  columnDefs: ColDef[] = [];
  myLeaves: any[] = [];

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
        field: 'actions', headerName: 'Actions',
        colId: 'actions',
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.actionsElement
        },
        pinned: 'right',
        sortable: false, filter: false, resizable: true, maxWidth: 100,
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

  constructor(private annonceService: AnnoncesService, private leaveService: LeaveService, private router: Router) {
  }

  selectedLeave: any = null;
  displayDetailsModal = false;
  openLeaveDetails(leave: any) {
    this.selectedLeave = leave;
    this.displayDetailsModal = true;
  }

  redirectToCreateNewLeave() {
    this.router.navigate(['/dashboard/demande-conge']);
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

}
