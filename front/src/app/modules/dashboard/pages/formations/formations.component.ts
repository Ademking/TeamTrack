import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss']
})
export class FormationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  listFormations = [
    {
      id: 1,
      title: 'Formation 1',
      description: 'Description de la formation 1',
      date: '2020-01-01',
    },
    {
      id: 2,
      title: 'Formation 2',
      description: 'Description de la formation 2',
      date: '2020-01-02',
    },
    {
      id: 3,
      title: 'Formation 3',
      description: 'Description de la formation 3',
      date: '2020-01-03',
    },
    {
      id: 4,
      title: 'Formation 4',
      description: 'Description de la formation 4',
      date: '2020-01-04',
    }
  ]

}
