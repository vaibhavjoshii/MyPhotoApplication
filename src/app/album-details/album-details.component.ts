import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';
import { Photo } from '../Photo';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {

  albumId: string;
  photos: Photo[];

  constructor(private route: ActivatedRoute, private albumService: AlbumService) {
    this.albumId = "";
    this.photos = [];
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params=>{
      this.albumId = params.get('albumId');
      this.albumService.getPhotos(this.albumId).subscribe(
        photos => {
          this.photos = <Photo[]>photos;
        });
    });
  }

}
