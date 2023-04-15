import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/core/auth.service';
import { ForumService } from 'src/app/shared/services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  constructor(private forumService: ForumService, private authService: AuthService, private msg: HotToastService, private router: Router) { }

  forumPosts: any[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.getAllForumPosts();
  }

  getAllForumPosts() {
    this.isLoading = true;
    this.forumService.getAllForumPosts().subscribe((data: any) => {
      this.forumPosts = data.reverse();
      this.filtredPosts = this.forumPosts;
      this.isLoading = false;
    });
  }



  displayNewPostForm: boolean = false;

  submitNewPost() {
    let req = {
      "forumPost": {
        "title": this.newPost.value.title,
        "category": this.newPost.value.category.code,
        "content": this.newPost.value.content
      },
      "userId": this.authService.getUserId(),
    }

    this.forumService.submitNewForumPost(req).subscribe((data: any) => {
      this.msg.success('Votre publication a été ajoutée avec succès');
      this.newPost.reset();
      this.getAllForumPosts();
      this.displayNewPostForm = false;
    });
  }


  newPost: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    category: new FormControl('1', [Validators.required]),
  });


  openForumPost(post: any) {
    this.router.navigate(['dashboard/forum/', post.id]);
  }


  categories: any[] = [
    { description: "Discussions sur l'entreprise et le lieu de travail en général.", code: "Discussion générale", id: 1, name: 'Discussion générale' },
    { description: "Conseils pour la progression professionnelle et la planification de carrière.", code: "Développement de carrière", id: 2, name: 'Développement de carrière' },
    { description: "Conseils pour maintenir un mode de vie sain et promouvoir la santé mentale.", code: "Bien-être et santé", id: 3, name: 'Bien-être et santé' },
    { description: "Encourager la diversité et l'inclusion sur le lieu de travail.", code: "Diversité", id: 4, name: 'Diversité' },
    { description: "Mises à jour sur les projets en cours de l'entreprise.", code: "Projets en cours", id: 5, name: 'Projets en cours' },
    { description: "Recueillir des suggestions et des commentaires des employés pour améliorer l'entreprise et son fonctionnement.", code: "Suggestions et feedback", id: 6, name: 'Suggestions et feedback' },
    { description: "Discussions informelles pour se détendre et se divertir.", code: "Espace détente", id: 7, name: 'Espace détente' },
  ]


  filtredPosts: any[] = [];
  currentCategoryId: any = 0; // 0 = all categories

  filterByCategory(categoryId: any) {
    this.currentCategoryId = categoryId;
    if (categoryId == 0) {
      this.filtredPosts = this.forumPosts;
      return;
    }

    // get category name
    let categoryName = this.categories.find((category: any) => category.id == categoryId).name;

    // filter posts
    this.filtredPosts = this.forumPosts.filter((post: any) => post.category == categoryName);

  }

}
