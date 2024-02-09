import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errorMessage: string = '';
  message: string = '';

  userData = {
    email: '',
    password: '',
  };

  constructor(public userService: UserService, private router: Router) {}

  public async sendData() {
    try {
      const response = await this.userService.sendLoggedUser(this.userData);
      console.log(response);
      this.displayMessage('Sesión iniciada');
      if (response == true) {
        this.router.navigate(['user']);
      }
    } catch (error) {
      const errorHttp = error as HttpErrorResponse;
      this.displayError(errorHttp.error);
      console.error('Error: ', error);
    }
  }

  public displayError(errorMessage: string) {
    this.message = '';
    this.errorMessage = errorMessage;
  }

  public displayMessage(message: string) {
    this.errorMessage = '';
    this.message = message;
  }
}
