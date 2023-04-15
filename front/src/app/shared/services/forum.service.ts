import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ForumService {

 
    constructor(private httpClient: HttpClient) { }

    public getAllForumPosts() {
        return this.httpClient.get(`${environment.API_URL}/api/v1/forum/all`);
    }

    public submitNewForumPost(forumPost: any) {
        return this.httpClient.post(`${environment.API_URL}/api/v1/forum/add`, forumPost);
    }

    public getForumPostDetails(postId: any) {
        return this.httpClient.get(`${environment.API_URL}/api/v1/forum/${postId}`);
    }

    public submitComment(comment: any, postId: any) {
        return this.httpClient.post(`${environment.API_URL}/api/v1/forum/comment/${postId}`, comment);
    }

    public deleteComment(commentId: any) {
        return this.httpClient.delete(`${environment.API_URL}/api/v1/forum/comment/${commentId}`);
    }

}