import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { ForumService } from 'src/app/shared/services/forum.service';
import { ConfirmationService } from 'primeng/api';


@Component({
    selector: 'app-forum-post-details',
    templateUrl: './forum-post-details.component.html',
    styleUrls: ['./forum-post-details.component.scss']
})
export class ForumPostDetailsComponent implements OnInit {

    postId: any;
    postDetails: any;
    myId: any;
    commentForm: FormGroup = new FormGroup({
        comment: new FormControl('')
    });

    myInfo: any;
    isPageLoading: boolean = true;



    constructor(private route: ActivatedRoute, private forumService: ForumService, private authService: AuthService, private confirmationService: ConfirmationService, private router: Router) { }
    ngOnInit() {
        this.myId = this.authService.getCurrentUser().id;
        this.myInfo = this.authService.getCurrentUser();
        this.route.params.subscribe(params => {
            this.postId = params['id'];
            this.getPostDetails();
        });
    }

    getPostDetails() {
        this.forumService.getForumPostDetails(this.postId).subscribe((data: any) => {

            if (data) {
                this.postDetails = data;
                this.isPageLoading = false;
            }

            else {
               // redirect to 404 page
               this.router.navigate(['/404']);
            }
        });
    }

    submitComment() {
        let req = {
            "content": this.commentForm.value.comment
        }

        this.forumService.submitComment(req, this.postId).subscribe((data: any) => {
            this.commentForm.reset();
            this.forumService.getForumPostDetails(this.postId).subscribe((data2: any) => {
                this.getPostDetails()
                this.commentForm.reset();
                this.scrollTobottom();
            });
        });
    }

    scrollTobottom() {
        setTimeout(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }, 300);
    }


    deleteMyComment(commentId: any) {

        this.confirmationService.confirm({
            message: 'Etes-vous sûr de vouloir supprimer ce commentaire ?',
            accept: () => {
                this.forumService.deleteComment(commentId).subscribe((data: any) => {
                    this.getPostDetails();
                });
            },
            reject: () => {
                return;
            },
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
        })
    }



    // generate a random color for the user avatar background based on the first letter of his first name
    // use tailwindcss background color classes
    generateRandomColor(name: string) {
        let firstLetter = name

        let colors = ['bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500'];
        let index = firstLetter.charCodeAt(0) % colors.length;
        return colors[index];
    }
}