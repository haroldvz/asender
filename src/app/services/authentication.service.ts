import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /**
   *Creates an instance of AuthenticationService.
   * @param {AngularFireAuth} angularFireAuth
   * @memberof AuthenticationService
   */
  constructor(private angularFireAuth: AngularFireAuth ) { 

  }

  /**
   *
   *
   * @param {string} email
   * @param {string} password
   * @returns
   * @memberof AuthenticationService
   */
  loginWithEmail(email:string, password:string){
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  /**
   *
   *
   * @param {string} email
   * @param {string} password
   * @returns
   * @memberof AuthenticationService
   */
  registerWithEmail(email:string, password:string){
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  /**
   *
   *
   * @returns
   * @memberof AuthenticationService
   */
  getStatus(){
    return this.angularFireAuth.authState;
  }

  /**
   *
   *
   * @returns
   * @memberof AuthenticationService
   */
  logOut(){
    return this.angularFireAuth.auth.signOut();
  }
}
