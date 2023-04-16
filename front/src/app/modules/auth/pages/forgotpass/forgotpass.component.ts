import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss']
})
export class ForgotpassComponent implements OnInit {

  constructor(private userService: UsersService, private msg: HotToastService) { }

  ngOnInit(): void {
  }

  email!: string;

  submit() {
    this.userService.resetPassword(this.email).subscribe(
      (res: any) => {
        this.msg.success("Votre demande a été prise en compte. Veuillez consulter votre boîte mail pour réinitialiser votre mot de passe.");
      });
  }

}
