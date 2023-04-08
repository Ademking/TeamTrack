import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  displayNewPostForm: boolean = false;

  submitNewPost() {
    this.displayNewPostForm = false;
    console.log('submit new post');
  }


  newPost: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    category: new FormControl('1', [Validators.required]),
  });
}
