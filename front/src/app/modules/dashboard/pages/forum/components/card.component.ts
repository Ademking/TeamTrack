import { Component, OnInit } from '@angular/core';

@Component({
    selector: '[app-forum-card]',
    template: `<li class="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg">
    <article aria-labelledby="question-title-81614">
        <div>
            <div class="flex space-x-3">
                <div class="flex-shrink-0">
                    <img class="h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="">
                </div>
                <div class="min-w-0 flex-1">
                    <p class="text-sm font-medium text-gray-900">
                        <a href="#" class="hover:underline">Dries Vincent</a>
                    </p>
                    <p class="text-sm text-gray-500">
                        <a href="#" class="hover:underline">
                            <time datetime="2020-12-09T11:43:00">December 9 at 11:43 AM</time>
                        </a>
                    </p>
                </div>

            </div>
            <h2 id="question-title-81614" class="mt-4 text-base font-medium text-gray-900">What
                would you have done differently if you ran Jurassic Park?</h2>
        </div>
        <div class="mt-2 text-sm text-gray-700 space-y-4">
            <p>Jurassic Park was an incredible idea and a magnificent feat of engineering, but poor
                protocols and a disregard for human safety killed what could have otherwise been one
                of the best businesses of our generation.</p>
            <p>Ultimately, I think that if you wanted to run the park successfully and keep visitors
                safe, the most important thing to prioritize would be&hellip;</p>
        </div>
        <div class="mt-6 flex justify-between space-x-8">
            <div class="flex space-x-6">
                <span class="inline-flex items-center text-sm">
                    <button type="button"
                        class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                        <!-- Heroicon name: solid/thumb-up -->
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor" aria-hidden="true">
                            <path
                                d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        <span class="font-medium text-gray-900">29</span>
                        <span class="sr-only">likes</span>
                    </button>
                </span>
                <span class="inline-flex items-center text-sm">
                    <button type="button"
                        class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                        <!-- Heroicon name: solid/chat-alt -->
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                                clip-rule="evenodd" />
                        </svg>
                        <span class="font-medium text-gray-900">11</span>
                        <span class="sr-only">replies</span>
                    </button>
                </span>

            </div>
            <div class="flex text-sm">
                <span class="inline-flex items-center text-sm">
                    <button type="button"
                        class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                        <!-- Heroicon name: solid/share -->
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor" aria-hidden="true">
                            <path
                                d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                        </svg>
                        <span class="font-medium text-gray-900">Share</span>
                    </button>
                </span>
            </div>
        </div>
    </article>
</li>`
})

export class ForumCardComponent implements OnInit {


    constructor() { }

    ngOnInit() { }
}