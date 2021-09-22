import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comment } from './Comment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) {}
  
  saveComment(photoId: string, newComment: string){
    var comment: Comment = {
      createdBy: "",
      dateCreated: "",
      id: "",
      message: newComment,
      photoId: photoId
    };

    var headers = this.getHeaders();
    return this.http.post(environment.API_BASE_URL + "photos/comments", comment, {headers});
  }

  makeAlbumCover(albumId: string, photoUrl: string){
    var headers = this.getHeaders();
    var params = new HttpParams()
      .set('photoUrl', photoUrl)
      .set('id', albumId)

    return this.http.put(environment.API_BASE_URL + "albums/CoverPhoto", params, {headers});
  }

  makeProfilePhoto(photoUrl: string){
    var headers = this.getHeaders();
    var params = new HttpParams().set('photoUrl', photoUrl);
    return this.http.put(environment.API_BASE_URL + "users/me/profilePhoto", params, {headers});
  }

  makeCoverPhoto(photoUrl: string){
    var headers = this.getHeaders();
    var params = new HttpParams().set('photoUrl', photoUrl);
    return this.http.put(environment.API_BASE_URL + "users/me/profilePhoto", params, {headers});
  }

  getPhoto(photoId: string){
    var headers = this.getHeaders();
    return this.http.get(environment.API_BASE_URL + "photos/find" + photoId, {headers});
  }

  getComments(photoId: string){
    var headers = this.getHeaders();
    return this.http.get(environment.API_BASE_URL + "photos/" + photoId + "/comments", {headers});
  } 

  getHeaders(){
    var headers = {
      'idToken': localStorage.getItem('userIdToken')
    };
    return headers;
  }
}
