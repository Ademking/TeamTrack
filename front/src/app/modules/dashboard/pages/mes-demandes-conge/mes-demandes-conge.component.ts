import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { TemplateRendererComponent } from 'src/app/shared/components/template-renderer.component';
import { AnnoncesService } from 'src/app/shared/services/annonces.service';

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



  ngOnInit(): void { }
  @ViewChild('actions') actionsElement!: TemplateRef<any>;
  annonces: any[] = [];

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
      { field: 'title', headerName: 'Titre' },
      { field: 'description', headerName: 'Description' },
      { field: 'date', headerName: 'Date de publication' },
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

  constructor(private annonceService: AnnoncesService) {
    this.annonceService.getAllAnnonces().subscribe((annonces: any) => {
      this.annonces = annonces;
      this.gridOptions.api?.setRowData(this.annonces);
    }
    );
  }


  
}
