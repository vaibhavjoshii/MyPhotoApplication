import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  title = 'Profile Page Title';

  imageUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  viewCount = 0;

  name = "Vaibhav";

  list = ["Item1", "Item2", "Item3"];

  user: User;

  constructor(private userService: UserService) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.userService.getCurrentUserProfile().subscribe(
      userProfile =>{
        this.user = <User>userProfile;
      }
    )
  }

  incrementCount(){
    this.viewCount++;
  }

}
