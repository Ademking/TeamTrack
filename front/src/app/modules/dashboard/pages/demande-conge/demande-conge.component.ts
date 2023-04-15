import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { LeaveService } from 'src/app/shared/services/leave.service';

@Component({
  selector: 'app-demande-conge',
  templateUrl: './demande-conge.component.html',
  styleUrls: ['./demande-conge.component.scss']
})
export class DemandeCongeComponent implements OnInit {

  constructor(private notif: HotToastService, private leaveService: LeaveService, private router: Router) { }

  minDate = new Date();
  ngOnInit(): void {
    this.newCongeForm.controls['dateDebut'].valueChanges.subscribe((value: any) => {
      // reset dateFin
      this.newCongeForm.controls['dateFin'].setValue(null);
      this.minDate = value;

    });
  }


  newCongeForm = new FormGroup({
    dateDebut: new FormControl(null, Validators.required),
    dateFin: new FormControl(null, Validators.required),
    typeConge: new FormControl(null, Validators.required),
    causes: new FormControl(null),
    commentaire: new FormControl(null),
    confirmation: new FormControl(null, [Validators.required, Validators.pattern('true')])
  })

  /**
   *  ANNUAL_LEAVE, MATERNITY_LEAVE, SICK_LEAVE
   */
  typeConge = [
    { value: 'ANNUAL_LEAVE', name: 'Congé annuel' },
    { value: 'MATERNITY_LEAVE', name: 'Congé maternité' },
    { value: 'SICK_LEAVE', name: 'Congé maladie' }
  ];

  submitConge() {
    if (this.newCongeForm.valid) {

      let req = {
        startDate: this.newCongeForm.value.dateDebut,
        endDate: this.newCongeForm.value.dateFin,
        type: this.newCongeForm.value.typeConge,
        reason: this.newCongeForm.value.causes,
        comment: this.newCongeForm.value.commentaire,
      }
      this.leaveService.postLeaveDemand(req).subscribe(
        (res) => {
          console.log(res);
          this.notif.success('Votre demande a été envoyée avec succès');
          this.router.navigate(['/dashboard/mes-demandes-conge']);
        });
    }
    else {
      console.log('Form not valid');
      this.notif.error('Veuillez remplir tous les champs');

    }
  }



}
