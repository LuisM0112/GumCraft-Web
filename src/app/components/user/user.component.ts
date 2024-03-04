import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Order } from 'src/app/model/order';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  currentUser: User = new User();

  orderList: Order[] = [];

  errorMessage: string = '';
  message: string = '';

  constructor(
    private userService: UserService
  ) {
    this.message = '';
    this.errorMessage = '';
  }

  ngOnInit(): void {
    this.getUser();
    this.getOrders();
  }

  public async getUser() {
    try {
      this.currentUser = await this.userService.getUser();
    } catch (error) {
      const errorHttp = error as HttpErrorResponse;
      const errorString = errorHttp.error ? errorHttp.error : (error as string);

      this.displayError(errorString);
      console.error('Error: ', error);
    }
  }

  public async getOrders() {
    try {
      this.orderList = await this.userService.getOrders();
      if (this.orderList == null || !(this.orderList.length > 0)) {
        this.displayMessage('No hay pedidos');
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
}
