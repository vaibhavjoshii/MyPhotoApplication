import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyPhotoApplication';

  constructor(public userService: UserService, public messageService: MessageService) { }

  logout(){
    this.userService.logout();
  }

  clearMessages(){
    this.messageService.clearMessages();
  }

}
