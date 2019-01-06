import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  operation: string = 'login';
  email: string = null;
  password: string = null;
  nick: string = null;

  constructor(private authService: AuthenticationService, 
    private userService:UserService, private router:Router) { }

  ngOnInit() {
  }

  /**
   *
   *
   * @memberof LoginComponent
   */
  logIn() {
    this.authService.loginWithEmail(this.email,this.password).then((data)=>{
      alert('LOG IN');
      console.log(data);
      this.router.navigate(['home']);
    }).catch((err)=>{
      alert('ERROR');
      console.log(err);
    });
  }

  /**
   *
   *
   * @memberof LoginComponent
   */
  register() {
    this.authService.registerWithEmail(this.email,this.password).then((data)=>{
      alert('REGISTERED');
      const user = {
        uid: data.user.uid,
        email: this.email,
        nick: this.nick
      };
      this.userService.createCompleteUser(user).then((response)=>{
        console.log('user created',response);

      }).then((err)=>{
          console.log('error in create',err);
      });
      console.log(data);
    }).catch((err)=>{
      alert('ERROR');
      console.log(err);
    });
  }

}
