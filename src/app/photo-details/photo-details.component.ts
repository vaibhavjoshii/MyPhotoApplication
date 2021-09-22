import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../Photo';
import { PhotoService } from '../photo.service';
import { Comment } from '../Comment';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  photoId: string;
  photo: Photo;
  allComments: Comment[];
  newComment: string;
  commentOrder: string;

  constructor(private route: ActivatedRoute, private photoService: PhotoService) {
    this.photoId = "";
    this.photo = new Photo();
    this.allComments = []; 
    this.newComment = "";
    this.commentOrder = "reverse";
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params=>{
      this.photoId = params.get('photoId');
      this.loadPhoto(this.photoId);
      this.loadComments(this.photoId);
    });
  }

  loadPhoto(photoId: string){
    this.photoService.getPhoto(photoId)
      .subscribe(
        photo => {
          this.photo = <Photo>photo;
        }
      );
  }

  changeOrder(photoId: string){
    if(this.commentOrder == "reverse"){
      this.photoService.getComments(photoId)
      .subscribe(
        comments => {
          this.allComments = (<Comment[]>comments);
        }
      );
      this.commentOrder = "start";
    }
    else if(this.commentOrder == "start"){
      this.photoService.getComments(photoId)
      .subscribe(
        comments => {
          this.allComments = (<Comment[]>comments).reverse();
        }
      );
      this.commentOrder = "reverse";
    }
  }

  loadComments(photoId: string){
    this.photoService.getComments(photoId)
      .subscribe(
        comments => {
          this.allComments = (<Comment[]>comments).reverse();
        }
      );
  }

  makeProfilePhoto(){
    this.photoService.makeProfilePhoto(this.photo.photoUrl)
      .subscribe(
        response => {
          console.log("Profile Photo updated");
        }
      );
  }

  makeCoverPhoto(){
    this.photoService.makeCoverPhoto(this.photo.photoUrl)
      .subscribe(
        response => {
          console.log("Cover Photo updated");
        }
      );
  }

  saveComment(){
    this.photoService.saveComment(this.photoId, this.newComment)
      .subscribe(
        response => {
          console.log("Comment Posted!!");
          this.loadComments(this.photoId);
          this.newComment = "";
        }
      )

  }

}
