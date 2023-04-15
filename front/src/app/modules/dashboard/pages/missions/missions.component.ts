import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, CellClickedEvent, GridApi, GridOptions } from 'ag-grid-community';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import localeText from 'src/app/core/ag-grid-i18n';
import { TemplateRendererComponent } from 'src/app/shared/components/template-renderer.component';
import { MissionsService } from 'src/app/shared/services/missions.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {

  constructor(private missionsService: MissionsService, private userService: UsersService, private fb: FormBuilder, private msg: HotToastService, private confirmationService: ConfirmationService) {
    this.missionsService.getAllMissions().subscribe((missions: any) => {
      this.missions = missions.reverse();
      this.gridOptions.api?.setRowData(this.missions);
    }
    );
  }

  newMissionForm!: FormGroup;
  editMissionForm!: FormGroup;

  ngOnInit(): void {
    this.newMissionForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl(''),
      missionStatus: new FormControl('', [Validators.required]),
      employees: new FormControl('', [Validators.required]),
    });

    this.editMissionForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl(''),
      missionStatus: new FormControl('', [Validators.required]),
      employees: new FormControl('', [Validators.required]),
    });


    this.userService.getAllUsers().subscribe((users: any) => {

      // add fullname property to user object
      this.employees = users.map((user: any) => {
        return {
          id: user.id,
          fullname: user.firstname + ' ' + user.lastname
        }
      });

      console.log(this.employees)

    });
  }
  @ViewChild('actions') actionsElement!: TemplateRef<any>;
  missions: any[] = [];

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

  ngAfterViewInit(): void {
    this.gridOptions.api!.setColumnDefs([
      { field: 'name', headerName: 'Nom de la mission', minWidth: 300 },
      { field: 'description', headerName: 'Description', minWidth: 300 },
      {
        field: 'missionStatus',
        headerName: 'Statut de la mission',
        cellRenderer: function (params: any) {

          let missionStatus = params.data.missionStatus;
          switch (missionStatus) {
            case 'PLANNED':
              return `<span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">Planifiée</span>`;
            case 'IN_PROGRESS':
              return `<span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">En cours</span>`;
            case 'COMPLETED':
              return `<span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">Terminée</span>`;
            case 'CANCELLED':
              return `<span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">Annulée</span>`;
            default:
              break;
          }
          let htmlcontent = `<span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">${missionStatus}</span>`;
          return htmlcontent;
        }
      },
      { field: 'startDate', headerName: 'Date Début' },
      { field: 'endDate', headerName: 'Date Fin' },
      {
        field: 'duration', headerName: 'Durée (en jours)', valueFormatter: (params) => {
          let startDate = new Date(params.data.startDate);
          let endDate = new Date(params.data.endDate);
          let duration = endDate.getTime() - startDate.getTime();
          let days = Math.floor(duration / (1000 * 60 * 60 * 24));
          return days + ' jours';
        }
      },
      {
        field: 'employees', headerName: 'Employés', 
        minWidth: 300,
        valueFormatter: (params) => {
          let employees = '';
          params.value.forEach((employee: any) => {
            employees += employee.firstname + ' ' + employee.lastname + (params.value.indexOf(employee) < params.value.length - 1 ? ', ' : '');
          });
          return employees;
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



  displayAddNewMissionDialog = false
  displayDetails: boolean = false;
  selectedMission: any = null;

  openDetails(mission: any) {
    this.selectedMission = mission;
    this.displayDetails = true;
  }



  openNewMissionModal() {
    this.displayAddNewMissionDialog = true;
  }

  missionStatuses = [
    //     PLANNED, IN_PROGRESS, COMPLETED, CANCELLED
    { label: 'Planifiée', value: 'PLANNED' },
    { label: 'En cours', value: 'IN_PROGRESS' },
    { label: 'Terminée', value: 'COMPLETED' },
    { label: 'Annulée', value: 'CANCELLED' },
  ];

  employees: any[] = [];


  submitNewMission() {
    console.log(this.newMissionForm.value);
    let employeesIds = this.newMissionForm.value.employees.map((employee: any) => {
      return employee.id;
    });
    let reqObj = {
      mission: {
        name: this.newMissionForm.value.name,
        description: this.newMissionForm.value.description,
        startDate: this.newMissionForm.value.startDate[0],
        endDate: this.newMissionForm.value.startDate[1],
        missionStatus: this.newMissionForm.value.missionStatus,
      },
      employeesIds: [
        ...employeesIds
      ]
    }

    this.missionsService.createMission(reqObj).subscribe((mission: any) => {
      this.missionsService.getAllMissions().subscribe((missions: any) => {
        this.missions = missions.reverse();
        this.gridOptions.api?.setRowData(this.missions);
        this.displayAddNewMissionDialog = false;
        this.msg.success('Mission ajoutée avec succès');
      });
    });
  }


  submitEditMission() {
    console.log(this.editMissionForm.value);
    let employeesIds = this.editMissionForm.value.employees.map((employee: any) => {
      return employee.id;
    });
    let reqObj = {
      mission: {
        name: this.editMissionForm.value.name,
        description: this.editMissionForm.value.description,
        startDate: this.editMissionForm.value.startDate[0],
        endDate: this.editMissionForm.value.startDate[1],
        missionStatus: this.editMissionForm.value.missionStatus,
      },
      employeesIds: [
        ...employeesIds
      ]
    }

    this.missionsService.modifyMission(this.selectedMission.id, reqObj).subscribe((mission: any) => {
      this.missionsService.getAllMissions().subscribe((missions: any) => {
        this.missions = missions.reverse();
        this.gridOptions.api?.setRowData(this.missions);
        this.showEditModal = false;
        this.msg.success('Mission modifiée avec succès');
      });
    });

  }


  showEditModal = false;
  openEdit(mission: any) {


    this.selectedMission = mission;
    this.showEditModal = true;
    this.editMissionForm.patchValue({
      name: mission.name,
      description: mission.description,
      startDate: [new Date(mission.startDate), new Date(mission.endDate)],
      endDate: new Date(mission.endDate),
      missionStatus: mission.missionStatus,
      employees: mission.employees.map((employee: any) => {
        return {
          id: employee.id,
          fullname: employee.firstname + ' ' + employee.lastname
        }
      })
    });
  }

  // generate a random color for the user avatar background based on the first letter of his first name
  // use tailwindcss background color classes
  generateRandomColor(name: string) {
    let firstLetter = name

    let colors = ['bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500'];
    let index = firstLetter.charCodeAt(0) % colors.length;
    return colors[index];
  }

  deleteMission(missionId: any) {


    this.confirmationService.confirm({
      message: 'Etes-vous sûr de vouloir supprimer cette mission ?',
      accept: () => {
        this.missionsService.deleteMission(missionId).subscribe((res: any) => {
          this.missionsService.getAllMissions().subscribe((missions: any) => {
            this.missions = missions.reverse();
            this.gridOptions.api?.setRowData(this.missions);
            this.msg.success('Mission supprimée avec succès');
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

