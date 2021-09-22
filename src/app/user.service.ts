import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate{

  user: Observable<firebase.User>;
  defaultPtofilePhoto: string = "http://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  constructor(private firebaseAuth: AngularFireAuth, private router: Router, 
      private http: HttpClient,
      private messageService: MessageService) {
    this.user = firebaseAuth.authState; 
    this.user.subscribe(
      userInfo => {
        console.log("User Info is available", userInfo)
        this.saveIdToken(userInfo);
      }
    );
  }
  
  canActivate(): boolean{
    if(this.firebaseAuth.auth.currentUser!=null){
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }

  storeIdToken(idToken: Promise<string>){
    idToken.then(
      idTokenValue => {
        localStorage.setItem('userIdToken', idTokenValue);
        console.log("Id Token Value: ", localStorage.getItem('userIdToken'));
      }
    );
  }

  saveIdToken(firebaseUser: firebase.User){
    firebaseUser.getIdToken().then(
      idTokenValue => {
        localStorage.setItem('userIdToken', idTokenValue);
        console.log("Id Token Value: ", localStorage.getItem('userIdToken'));
      }
    );
  }

  signup(email: string, password: string, name: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then((value: any) => {
        console.log('Success signup!', value);
        this.saveIdToken(value.user);
        this.registerUser(email, name);
      })
      .catch((err: { message: any; }) => {
        console.log('Something went wrong:',err.message);
    });    
  }

  registerUser(email: string, name: string){
    var user: User = {
      id: "",
      email: email,
      name: name,
      profilePhotoUrl: this.defaultPtofilePhoto  
    };
    this.http.post(environment.API_BASE_URL + "users/", user)
      .subscribe(response=>{
        console.log('Success registration!');
        this.router.navigate(['albums/recent']);
    });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then((value: any) => {
        console.log('Nice, it worked!');
        this.saveIdToken(value.user);
        this.router.navigate(['albums/recent']);
      })
      .catch((err: { message: any; }) => {
        console.log('Something went wrong:',err.message);
        this.messageService.newMessage(err.message);
      });
  }

  logout() {
    localStorage.clear();
    this.firebaseAuth
      .auth
      .signOut();
    
    this.router.navigate(['login']);
  }

  getCurrentUserProfile(){
    var headers = this.getHeaders();
    return this.http.get(environment.API_BASE_URL + "users/find", {headers}); 
  }

  getHeaders(){
    var headers = {
      'idToken': localStorage.getItem('userIdToken')
    };
    return headers;
  }
}
