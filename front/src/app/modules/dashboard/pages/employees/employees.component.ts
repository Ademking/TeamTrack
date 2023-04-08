import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { TeamsService } from 'src/app/shared/services/teams.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { TeamsComponent } from './components/teams/teams.component';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  maxDate = new Date();

  constructor(private usersService: UsersService,
    private teamsService: TeamsService,
    public dialogService: DialogService,
    public confirmationService: ConfirmationService,
    public msg: HotToastService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.getTeams();
  }


  getTeams() {
    // Get all teams
    this.teamsService.getAllTeams().subscribe((teams: any) => {
      this.teams = teams;
    }
    );
  }

  getUsers() {
    // Get all employees
    this.usersService.getAllUsers().subscribe((users: any) => {
      this.users = users;
      this.groupedUsers = this.groupUsers(users);
      this.filtredGroupedUsers = this.groupedUsers;
      this.isLoading = false;
    });
  }

  /**
   * Helper function to group users by first letter of their name
   * @param users Users list
   * @returns grouped users
   */
  groupUsers(users: any[]) {
    let groupedUsers = users.reduce((acc, user) => {
      let firstLetter = user.firstname[0];
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(user);
      return acc;
    }, {});
    return groupedUsers;
  }

  users: any[] = [];
  groupedUsers: any = {}
  selectedUser: any = null;
  teams: any[] = [];
  isLoading = true;

  openUserDetails(user: any) {
    this.selectedUser = user;
    console.log(user);
  }

  displayTeams = false;

  openTeamsModal() {
    // this.displayTeams = true;
    const ref = this.dialogService.open(TeamsComponent, {
      header: 'Equipes',
      width: '40vw',
      contentStyle: { "background-color": "#f5f5f5", padding: "15px" },
    });

    // When the modal is closed
    ref.onClose.subscribe((user: any) => {

      // if user is not null, it means that we want to select a user and show his details
      if (user) {
        this.selectedUser = user;
      }
      this.getTeams();
    });
  }

  filtredGroupedUsers: any = {};

  search($event: any) {
    let value = $event.target.value;
    if (value) {
      this.filtredGroupedUsers = this.groupUsers(this.users.filter(user => user.firstname.toLowerCase().includes(value.toLowerCase())));
    } else {
      this.filtredGroupedUsers = this.groupedUsers;
    }
  }

  searchByFirstname($event: any) {
    let firstname = $event.target.value;
    this.filtredGroupedUsers = this.groupUsers(this.users.filter(user => user.firstname.toLowerCase().includes(firstname.toLowerCase())));
  }

  searchByLastname($event: any) {
    let lastname = $event.target.value;
    this.filtredGroupedUsers = this.groupUsers(this.users.filter(user => user.lastname.toLowerCase().includes(lastname.toLowerCase())));
  }

  searchByEmail($event: any) {
    let email = $event.target.value;
    this.filtredGroupedUsers = this.groupUsers(this.users.filter(user => user.email.toLowerCase().includes(email.toLowerCase())));
  }

  searchByPhone($event: any) {
    let phone = $event.target.value;
    this.filtredGroupedUsers = this.groupUsers(this.users.filter(user => user.phone.toLowerCase().includes(phone.toLowerCase())));
  }


  displayAddNewEmployeeDialog = false;

  newEmployee = new FormGroup({
    gender: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    // custom validator to check if the password and the confirmation are the same
    password_confirmation: new FormControl('', [Validators.required, (control: FormControl) => {
      if (control.value !== this.newEmployee?.get('password')?.value) {
        return { password_confirmation: true };
      }
      return null;
    }]),
    job: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    team: new FormControl('', Validators.required),
    //avatar: new FormControl('', Validators.required),
    date_of_birth: new FormControl('', Validators.required),
    date_of_hiring: new FormControl('', Validators.required),
  });

  genders = [{ name: 'Homme', value: 'm' }, { name: 'Femme', value: 'f' }];

  submitNewEmployee() {
    // check if the form is valid
    if (this.newEmployee.valid) {


      // submit
      this.usersService.addUser({
        firstname: this.newEmployee.value.firstname,
        lastname: this.newEmployee.value.lastname,
        phone: this.newEmployee.value.phone,
        address: this.newEmployee.value.address,
        gender: (<any>this.newEmployee.value.gender).value,
        email: this.newEmployee.value.email,
        password: this.newEmployee.value.password,
        job: this.newEmployee.value.job,
        employeeCode: this.newEmployee.value.code,
        team: this.newEmployee.value.team,
        birthdate: this.newEmployee.value.date_of_birth,
        joinDate: this.newEmployee.value.date_of_hiring,

      }).subscribe((user: any) => {
        this.msg.success('Employé ajouté avec succès');
        this.getUsers();
        this.displayAddNewEmployeeDialog = false;

      })
    }
    else {
      // console.log what's wrong
      console.log(this.newEmployee);
    }
  }

  // generate a random color for the user avatar background based on the first letter of his first name
  // use tailwindcss background color classes
  generateRandomColor(name: string) {
    let firstLetter = name
    let colors = ['bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500'];
    let index = firstLetter.charCodeAt(0) % colors.length;
    return colors[index];
  }


  deleteUser(userId: string) {

    this.confirmationService.confirm({
      message: 'Etes-vous sûr de vouloir supprimer cet employé ?',
      accept: () => {
        this.usersService.deleteUser(userId).subscribe(() => {
          this.selectedUser = null;
          this.getUsers();
        })
      },
      reject: () => {
        return;
      },
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
    })
  }
}
