import { Component, OnInit } from '@angular/core';
import { Album } from '../Album';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-recent-albums',
  templateUrl: './recent-albums.component.html',
  styleUrls: ['./recent-albums.component.css']
})
export class RecentAlbumsComponent implements OnInit {

  albums: Album[];

  constructor(private albumService: AlbumService) {
    this.albums = [];
   }

  ngOnInit(): void {
    this.albumService.getAllAlbums().subscribe(
      response=>{
        this.albums = <Album[]>response;
        console.log("Got all albums response", this.albums);
      }
    );
  }

}
