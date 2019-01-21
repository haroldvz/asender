import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { RequestService } from './services/request.service';
import { User } from 'firebase';
import { DialogService } from 'ng2-bootstrap-modal';
import { RequestComponent } from './modals/request/request.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app';
  user: User;// save logged user
  request: any[] = [];// save all request that i have
  mailsShow: any[] = []; // for know what request i have seen
  constructor(public router: Router, private authenticationService: AuthenticationService,
    private userService: UserService, private requestService: RequestService, private dialogService: DialogService) {

    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
        this.requestService.getRequestForEmail(this.user.email).valueChanges().subscribe((request: any) => {
          //console.log('REQUEST',request);
          this.request = request;
          this.request = this.request.filter((r)=>{
            return r.status !== 'accepted' && r.status !== 'rejected';
          });
          this.request.forEach((r)=>{
            if(this.mailsShow.indexOf(r.sender) === -1){
              
              this.mailsShow.push(r.sender);
              this.dialogService.addDialog(RequestComponent,{scope:this, currentRequest:r });
            }
          })
        }), (error) => {
          console.log(error);
        }
      });
    });

  }
}
