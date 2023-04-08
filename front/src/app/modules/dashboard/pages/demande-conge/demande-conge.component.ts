import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-demande-conge',
  templateUrl: './demande-conge.component.html',
  styleUrls: ['./demande-conge.component.scss']
})
export class DemandeCongeComponent implements OnInit {

  constructor(private notif: HotToastService) { }

  ngOnInit(): void {
  }


  newCongeForm = new FormGroup({
    dateDebut: new FormControl(null, Validators.required),
    dateFin: new FormControl(null, Validators.required),
    typeConge: new FormControl(null, Validators.required),
    causes: new FormControl(null),
    commentaire: new FormControl(null),
    confirmation: new FormControl(null, [Validators.required, Validators.pattern('true')])
  })

  typeConge = [
    { value: 'conge-annuel', name: 'Congé annuel' },
    { value: 'conge-maternite', name: 'Congé maternité' },
    { value: 'conge-maladie', name: 'Congé maladie' }
  ];

  submitConge() {
    if (this.newCongeForm.valid) {
      console.log(this.newCongeForm.value);
      this.notif.success('Votre demande a été envoyée avec succès');
    }
    else {
      console.log('Form not valid');
      this.notif.error('Veuillez remplir tous les champs');

    }
  }



}
