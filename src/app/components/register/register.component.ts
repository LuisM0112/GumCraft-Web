import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  userData = {
    userName: '',
    email: '',
    password: '',
    passwordBis: '',
    address: ''
  };

  constructor(public userService: UserService) { }

  public sendData() {
    this.userService.sendNewUser(this.userData);
  }

}
