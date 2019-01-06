import { Component, OnInit } from '@angular/core';
import { User } from '../types/usert.type';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  friends: User[] = [];

  constructor(private userService: UserService, 
    private authService: AuthenticationService, private router: Router) { 
    this.userService.getUsers().valueChanges().subscribe((data: User[])=>{
      this.friends = data;
    },
    (error) =>{
        console.log(error);
    })
  }

  ngOnInit() {
  }

  logOut(){
    this.authService.logOut().then(()=>{
      alert('Cerrando sesión');
      this.router.navigate(['login']);
    }).catch((err)=>{
      console.log('ERROR LOGUT',err);
    });
  }

}
