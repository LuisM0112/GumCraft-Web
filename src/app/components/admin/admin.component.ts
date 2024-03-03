import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UrlSegment } from '@angular/router';
import { User } from 'src/app/model/user';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  errorMessage: string = '';
  message: string = '';

  userList: User[] = [];
  constructor(private userService: UserService) {
    this.message = '';
    this.errorMessage = '';
  }

  async ngOnInit(): Promise<void> {
    this.errorMessage = '';
    this.message = '';
    this.getUserList();
  }

  public async getUserList() {
    try {
      this.userList = await this.userService.getUser();
      if (this.userList == null) {
        this.displayMessage('no tienes permiso >:(');
      }
    } catch (error) {
      const errorHttp = error as HttpErrorResponse;
      const errorString = errorHttp.error ? errorHttp.error : (error as string);
      this.displayError(errorString);
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

  public async delete(userId: number) {
    try {
      var response = await this.userService.deleteUser(userId);
      console.log(response);
      this.displayMessage(response);
    } catch (error) {
      const errorHttp = error as HttpErrorResponse;
      this.displayError(errorHttp.error);
      console.error('Error: ', error);
    }
    this.getUserList();
  }

  public async chageRole(userId: number) {
    try {
      var response = await this.userService.changeUserRole(userId);
      console.log(response);
      this.displayMessage(response);
    } catch (error) {
      const errorHttp = error as HttpErrorResponse;
      this.displayError(errorHttp.error);
      console.error('Error: ', error);
    }
    this.getUserList();
  }
}
