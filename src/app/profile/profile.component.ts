import { Component, OnInit } from '@angular/core';
import { User } from '../types/usert.type';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  picture: any;

  /**
   *Creates an instance of ProfileComponent.
   * @param {UserService} userService
   * @param {AuthenticationService} authenticationService
   * @param {AngularFireStorage} firebaseStorage
   * @memberof ProfileComponent
   */
  constructor(private userService: UserService, private authenticationService: AuthenticationService, private firebaseStorage: AngularFireStorage) {
    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
        console.log(this.user);
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }

  /**
   *
   *
   * @memberof ProfileComponent
   */
  ngOnInit() {
  }

  /**
   *
   *
   * @memberof ProfileComponent
   */
  saveWithImage() {
    const currentPictureId = Date.now();
    const pictures = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').putString(this.croppedImage, 'data_url');
    pictures.then((result) => {
      this.picture = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
      this.picture.subscribe((p) => {
        this.userService.setAvatar(p, this.user.uid).then(() => {
          alert('Avatar subido correctamentne');
        }).catch((error) => {
          alert('Hubo un error al tratar de subir la imagen');
          console.log(error);
        });
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  /**
   *
   *
   * @memberof ProfileComponent
   */
  saveWithoutImage() {
    this.userService.editCompleteUser(this.user).then(() => {
      alert('Cambios guardados!');
    }).catch((error) => {
      alert('Hubo un error');
      console.log(error);
    });
  }

  /**
   *
   *
   * @memberof ProfileComponent
   */
  saveSettings() {
    if (this.croppedImage) {
      this.saveWithImage();
      this.saveWithoutImage();
    } else {
      this.saveWithoutImage();
    }
  }

  /**
   *
   *
   * @param {*} event
   * @memberof ProfileComponent
   */
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  /**
   *
   *
   * @param {string} image
   * @memberof ProfileComponent
   */
  imageCropped(image: string) {
    this.croppedImage = image;
  }

  /**
   *
   *
   * @memberof ProfileComponent
   */
  imageLoaded() {
    // show cropper
  }

  /**
   *
   *
   * @memberof ProfileComponent
   */
  loadImageFailed() {
    // show message
  }

}
