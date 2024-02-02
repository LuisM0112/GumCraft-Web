import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userData = {
    email: '',
    password: '',
  };
  
  constructor(public userService: UserService) { }

  public sendData() {
    this.userService.sendLoggedUser(this.userData);
  }
}
