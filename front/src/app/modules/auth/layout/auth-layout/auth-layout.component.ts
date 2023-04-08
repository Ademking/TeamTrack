import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  constructor() { }

  @Input() title: string = '';
  @Input() icon: string = 'assets/imgs/logo-black.png'
  @Input() bgImg: string ='assets/imgs/bg.png'

  ngOnInit(): void {
  }

  

}
