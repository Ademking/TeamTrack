import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
    selector: '[app-forum-card]',
    template: `<li class="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg">
    <article aria-labelledby="question-title-81614">
        <div>
            <div class="flex space-x-3">
                <div class="flex-shrink-0">
                 


                        <span class="inline-flex items-center justify-center h-10 w-10 rounded-full"
                                [ngClass]="generateRandomColor(forumPost.user?.lastname.charAt(0))">
                                <span class="text-sm font-medium leading-none text-white">{{forumPost.user?.firstname.charAt(0) }}{{ forumPost.user?.lastname.charAt(0)}}</span>
                            </span>

                </div>
                <div class="min-w-0 flex-1">
                    <p class="text-sm font-medium text-gray-900">
                        <a (click)="openForumPost(forumPost)"  class="hover:underline">
                            {{ forumPost.user.firstname}} {{ forumPost.user.lastname}}
                        </a>
                    </p>
                    <p class="text-sm text-gray-500">
                        <a (click)="openForumPost(forumPost)" class="hover:underline">
                          
                         
                            <time >
                                {{ forumPost.dateCreated | fromNow }}
                            </time>
                            <span class="text-gray-500 font-medium">·</span>
                            <time>
                                {{ forumPost.dateCreated | date: 'dd/MM/yyyy HH:mm' }}
                            </time>
                        </a>
                    </p>
                </div>

            </div>
            <h2 id="question-title-81614" class="mt-4 text-base font-medium text-gray-900">{{ forumPost.title }}</h2>
        </div>
        <div class="mt-2 text-sm text-gray-700 space-y-4" (click)="openForumPost(forumPost)">
            <div [innerHTML]="forumPost.content"></div>
        </div>
        <div class="mt-6 flex justify-between space-x-8">
            <div class="flex space-x-6">
                <span class="inline-flex items-center text-sm">
                    <button type="button" (click)="openForumPost(forumPost)" 
                        class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                        <!-- Heroicon name: solid/chat-alt -->
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                                clip-rule="evenodd" />
                        </svg>
                        <span class="font-medium text-gray-900">{{ forumPost.comments.length }} Commentaires</span>
                        <span class="sr-only">Commentaires</span>
                    </button>
                </span>

            </div>
            <div class="flex text-sm">
                <span class="inline-flex items-center text-sm">
                    <button type="button" (click)="copyToClipboard()"
                        class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                        <!-- Heroicon name: solid/share -->
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor" aria-hidden="true">
                            <path
                                d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                        </svg>
                        <span class="font-medium text-gray-900">Partager</span>
                    </button>
                </span>
            </div>
        </div>
    </article>
</li>`
})

export class ForumCardComponent implements OnInit {


    @Input() forumPost!: any;

    constructor(private msg: HotToastService, private router: Router) { }

    ngOnInit() { }

    generateRandomColor(name: string) {
        let firstLetter = name
        let colors = ['bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500'];
        let index = firstLetter.charCodeAt(0) % colors.length;
        return colors[index];
    }

    copyToClipboard() {
        // get current url
        let url = window.location.href + '/' + this.forumPost.id;
        navigator.clipboard.writeText(url).then().catch(e => console.log(e));
        this.msg.success('Lien copié dans le presse-papier !');
    }


    openForumPost(post: any) {
        this.router.navigate(['dashboard/forum/', post.id]);
    }
}