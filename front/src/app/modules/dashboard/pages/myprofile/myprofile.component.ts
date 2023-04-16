import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { ConnectedUserService } from 'src/app/shared/services/connectedUser.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {

  me: any;
  constructor(private connectedUserService: ConnectedUserService,
    private userService: UsersService,
    private msg: HotToastService
  ) { }

  ngOnInit(): void {
    this.getMyInfo();
  }

  editProfile: FormGroup = new FormGroup({
    gender: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    birthdate: new FormControl('', Validators.required),
  });


  getMyInfo() {
    this.connectedUserService.getMyProfile().subscribe((user: any) => {
      this.me = user;
      this.editProfile.patchValue({
        gender: user.gender,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        address: user.address,
        birthdate: user.birthdate
      })
    })
  }


  SubmitEditProfile() {

    if (this.editProfile.valid) {
      console.log(this.editProfile.value)
      this.userService.updateMyProfile({
        firstname: this.editProfile.value.firstname,
        lastname: this.editProfile.value.lastname,
        phone: this.editProfile.value.phone,
        address: this.editProfile.value.address,
        email: this.editProfile.value.email,
        gender: this.editProfile.value.gender,
        birthdate: this.editProfile.value.birthdate,
      }).subscribe((user: any) => {
        this.msg.success('Employé modifié avec succès');
        //this.getMyInfo();
      })
    }
    else {
      console.log(this.editProfile)
    }



  }

  changePasswordForm: FormGroup = new FormGroup({
    currentpass: new FormControl('', Validators.required),
    newpass: new FormControl('', Validators.required),
  });

  SubmitChangePassword() {
    if (this.changePasswordForm.valid) {
      this.userService.changePassword({
        currentpass: this.changePasswordForm.value.currentpass,
        newpass: this.changePasswordForm.value.newpass
      }).subscribe(
        success => {
          this.msg.success('Mot de passe modifié avec succès');
        },
        error => {
          this.msg.error('Vérifier votre mot de passe actuel');
        }
      )
    }
  }



}
