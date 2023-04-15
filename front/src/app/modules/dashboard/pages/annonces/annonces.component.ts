import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ConfirmationService } from 'primeng/api';
import localeText from 'src/app/core/ag-grid-i18n';
import { AuthService } from 'src/app/core/auth.service';
import { TemplateRendererComponent } from 'src/app/shared/components/template-renderer.component';
import { AnnoncesService } from 'src/app/shared/services/annonces.service';


@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.scss']
})
export class AnnoncesComponent implements OnInit {

  constructor(private annonceService: AnnoncesService, private msg: HotToastService, private authService: AuthService, private confirmationService: ConfirmationService) {
    this.annonceService.getAllAnnonces().subscribe((annonces: any) => {
      this.annonces = annonces.reverse();
      this.gridOptions.api?.setRowData(this.annonces);
    }
    );
  }

  displayNewAnnonce: boolean = false;
  displayEditAnnonce: boolean = false;
  displayDetailsAnnonce: boolean = false;


  showNewDialog() {
    this.displayNewAnnonce = true;
  }

  showDetailsDialog(annonce: any) {
    this.selectedAnnonce = annonce;
    this.displayDetailsAnnonce = true;
  }


  showEditDialog(annonce: any) {
    this.selectedAnnonce = annonce;
    this.displayEditAnnonce = true;
    this.editAnnonceForm.setValue({
      title: annonce.title,
      content: annonce.content,
    });
  }


  submitNewAnnounce() {
    console.log('submitNewAnnounce');
    let req = {
      title: this.newAnnonceForm.value.title,
      content: this.newAnnonceForm.value.content,
    }
    this.annonceService.submitNewAnnonce(req).subscribe((res: any) => {
      this.displayNewAnnonce = false;
      this.msg.success('Annonce publiée avec succès');
      this.annonceService.getAllAnnonces().subscribe((annonces: any) => {
        this.annonces = annonces.reverse();
        this.gridOptions.api?.setRowData(this.annonces);
      });
    });
  }

  selectedAnnonce: any;

  submitEditAnnounce() {
    console.log('submitEditAnnonce');
    let req = {
      title: this.editAnnonceForm.value.title,
      content: this.editAnnonceForm.value.content,
    }
    this.annonceService.updateAnnonce(this.selectedAnnonce.id, req).subscribe((res: any) => {
      this.displayEditAnnonce = false;
      this.msg.success('Annonce modifiée avec succès');
      this.annonceService.getAllAnnonces().subscribe((annonces: any) => {
        this.annonces = annonces.reverse();
        this.gridOptions.api?.setRowData(this.annonces);
      });
    });
  }


  newAnnonceForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  editAnnonceForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void { }
  @ViewChild('actions') actionsElement!: TemplateRef<any>;
  @ViewChild('contentElem') contentElem!: TemplateRef<any>;
  annonces: any[] = [];

  columnDefs: ColDef[] = [];
  rowData = [];

  gridOptions: GridOptions = {
    columnDefs: this.columnDefs,
    rowHeight: 60,
    pagination: true,
    localeText: localeText,
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
      {
        field: 'content',
        headerName: 'Description',
        colId: 'content',
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.contentElem
        },
        sortable: false, filter: false, resizable: true, maxWidth: 200,
        cellStyle: {
          'text-align': 'center', 'padding-left': '0px', 'padding-right': '0px', 'height': '100%',
          'display': 'flex ',
          'justify-content': 'center',
          'align-items': 'center ',
        }
      },
      {
        field: 'dateCreated',
        headerName: 'Date de publication',
        valueFormatter: (params) => {
          let date = new Date(params.value);
          return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        }
      },
      {
        field: 'lastUpdated',
        headerName: 'Date de modification',
        valueFormatter: (params) => {
          let date = new Date(params.value);
          return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        }
      },
      {
        field: 'actions',
        headerName: 'Actions',
        colId: 'actions',
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.actionsElement
        },
        hide: this.authService.isAdmin() ? false : true,
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

  deleteAnnonce(idAnnonce: any) {

    this.confirmationService.confirm({
      message: 'Etes-vous sûr de vouloir supprimer cette mission ?',
      accept: () => {
        this.annonceService.deleteAnnonce(idAnnonce).subscribe((res: any) => {
          this.annonceService.getAllAnnonces().subscribe((annonces: any) => {
            this.annonces = annonces.reverse();
            this.gridOptions.api?.setRowData(this.annonces);
            this.msg.success('Annonce supprimée avec succès');
          });
        });
      },
      reject: () => {
        return;
      },
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
    })


  }



}
