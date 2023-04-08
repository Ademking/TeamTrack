import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TeamsService } from 'src/app/shared/services/teams.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
})

export class TeamsComponent implements OnInit {
    constructor(private teamsService: TeamsService,
        private userService: UsersService,
        private dialogService: DialogService,
        public dialogRef: DynamicDialogRef,
        private msg: HotToastService,
        private confirmationService: ConfirmationService) { }
    teams: any[] = [];
    teamMembers: any[] = [];
    allUsers: any[] = [];
    selectedUsers: any[] = [];
    selectedTeam: any = null;
    isLoading = true;

    ngOnInit() {
        // Get all teams
        this.teamsService.getAllTeams().subscribe((teams: any) => {
            this.teams = teams.reverse();
            this.isLoading = false;
        });

        this.userService.getAllUsers().subscribe((users: any) => {
            // add fullname property to user object
            this.allUsers = users.map((user: any) => {
                return {
                    ...user,
                    fullname: user.firstname + ' ' + user.lastname
                };
            });

        });
    }

    displayEditTeamDialog = false;
    displayAddTeamDialog = false;
    displayTeamMembersDialog = false;

    showEditTeamDialog(team: any) {
        this.selectedTeam = team;
        this.displayEditTeamDialog = true;
    }

    showTeamMembers(team: any) {
        this.selectedTeam = team;
        this.teamMembers = team.users;
        this.displayTeamMembersDialog = true;
    }

    newTeamForm = new FormGroup({
        name: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        members: new FormControl(null, Validators.required)
    });

    // generate a random color for the user avatar background based on the first letter of his first name
    // use tailwindcss background color classes
    generateRandomColor(name: string) {
        let firstLetter = name
        let colors = ['bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500'];
        let index = firstLetter.charCodeAt(0) % colors.length;
        return colors[index];
    }

    displayUserDetails(user: any) {
        // emit event to parent component to display user details
        this.dialogRef.close(user);

        // this.dialogService.dialogComponentRefMap.forEach(dialog => {

        //     console.log(dialog);
        // });
    }

    submitNewTeam() {
        if (this.newTeamForm.valid) {

            this.teamsService.addTeam({
                team: {
                    name: this.newTeamForm.value.name,
                    description: this.newTeamForm.value.description
                },
                employeesIds: this.newTeamForm.value.members
            }).subscribe((team: any) => {
                this.msg.success('Votre équipe a été ajoutée avec succès');
                this.displayAddTeamDialog = false;
                this.teamsService.getAllTeams().subscribe((teams: any) => {
                    // reverse the array to display the latest added team at the top
                    this.teams = teams.reverse();
                });
            });
        }
    }

    deleteTeam(ev: any, teamId: any) {

        this.confirmationService.confirm({
          
            message: 'Êtes-vous sûr de vouloir supprimer cette équipe ?',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.teamsService.deleteTeam(teamId).subscribe((team: any) => {
                    this.msg.success('Votre équipe a été supprimée avec succès');
                    this.teamsService.getAllTeams().subscribe((teams: any) => {
                        // reverse the array to display the latest added team at the top
                        this.teams = teams.reverse();
                    });
                });
            },
            reject: () => {
                return;
            }
        });


    }
}
