import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../types/usert.type';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  friendId: any;
  friend: User;
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { 
    this.friendId = this.activatedRoute.snapshot.params['uid'];// same name of the param as routing file
    this.userService.getUserById(this.friendId).valueChanges().subscribe((data:User)=>{
      this.friend = data;
    }, (error)=>{
      console.log(error);
    })
  }

  ngOnInit() {
  }

}
