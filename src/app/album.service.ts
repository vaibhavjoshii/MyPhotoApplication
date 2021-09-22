import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Album } from './Album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient, private router: Router) { }

  saveAlbum(albumTitle: string, fileId: string){

    var album: Album = {
      coverPhotoUrl: environment.API_BASE_URL + "files/show" + fileId,
      createdBy: "",
      dateCreated: "",
      id: "",
      title: albumTitle
    };

    var headers = this.getHeaders();
    this.http.post(environment.API_BASE_URL + "albums", album, {headers})
      .subscribe(
        albumData => {
          var album: Album = <Album>(albumData);
          var albumId = album.id;
          this.router.navigate(['album/', albumId]);
        }
      )
  }

  getAllAlbums(){
    var headers = this.getHeaders();
    return this.http.get(environment.API_BASE_URL + "albums/", {headers});
  }

  getAlbumDetails(albumId: string){
    var headers = this.getHeaders();
    return this.http.get(environment.API_BASE_URL + "albums/find" + albumId, {headers});
  }

  getPhotos(albumId: string){
    var headers = this.getHeaders();
    return this.http.get(environment.API_BASE_URL + "albums/" + albumId + "/photos", {headers});
  }

  getHeaders(){
    var headers = {
      'idToken': localStorage.getItem('userIdToken')
    };
    return headers;
  }
}
