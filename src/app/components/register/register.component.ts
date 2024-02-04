import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  

  errorMessage: string = '';
  message: string = '';

  userData = {
    userName: '',
    email: '',
    password: '',
    passwordBis: '',
    address: ''
  };

  constructor(public userService: UserService) { }

  public async sendData() {
    try {
      const response = await this.userService.sendNewUser(this.userData);
      console.log(response);
      this.displayMessage(response);
    } catch (error) {
      const errorHttp = error as HttpErrorResponse;
      this.displayError(errorHttp.error);
      console.error('Error: ', error);
    }
  }

  public displayError(errorMessage: string){
    this.message = '';
    this.errorMessage = errorMessage;
  }

  public displayMessage(message: string){
    this.errorMessage = '';
    this.message = message;
  }

}
