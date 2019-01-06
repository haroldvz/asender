import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private angularFireDatabase: AngularFireDatabase) { }

  /**
   *
   *
   * @memberof UserService
   */
  getUsers() {
    return this.angularFireDatabase.list('/users');
  }

  /**
   *
   *
   * @param {string} uid
   * @returns
   * @memberof UserService
   */
  getUserById(uid: string) {
    return this.angularFireDatabase.object('/users/' + uid)
  }

  /**
   *
   *
   * @param {*} user
   * @returns
   * @memberof UserService
   */
  createCompleteUser(user){
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }

  /**
   *
   *
   * @param {*} user
   * @returns
   * @memberof UserService
   */
  editCompleteUser(user){
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }



}
