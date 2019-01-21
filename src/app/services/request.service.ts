import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private angularFireDatabase: AngularFireDatabase) { }

  createRequest(request){
    // for clean dots in email
    const cleanEmail = request.receiver_email.replace(/\./g,' ');
    return this.angularFireDatabase.object('request/' + cleanEmail + '/' + request.sender).set(request);
  }

  setRequestStatus(request, status){
    const cleanEmail = request.receiver_email.replace(/\./g,' ');
    return this.angularFireDatabase.object('request/' + cleanEmail + '/' + request.sender + '/status').set(status);
  }

  /**
   * Obtiene solicitudes enviadas a ese email
   * @param email 
   */
  getRequestForEmail(email){
    const cleanEmail = email.replace(/\./g,' ');
    return this.angularFireDatabase.list('request/' + cleanEmail);
  }
}
