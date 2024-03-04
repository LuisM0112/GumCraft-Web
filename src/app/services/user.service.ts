import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Subject, lastValueFrom, map } from 'rxjs';
import { User } from '../model/user';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API_URL: string = 'https://localhost:7065/api/Gumcraft';
  API_URLAuth: string = 'https://localhost:7065/api/Auth';
  private adminStatusSubject = new Subject<boolean>();
  adminStatus$ = this.adminStatusSubject.asObservable();

  isUserLogged: boolean = localStorage.getItem('Token') ? true : false;

  constructor(private httpClient: HttpClient) {}

  public async sendNewUser(userData: any): Promise<string> {
    const formData = new FormData();
    formData.append('UserName', userData.userName);
    formData.append('Email', userData.email);
    formData.append('Password', userData.password);
    formData.append('PasswordBis', userData.passwordBis);
    formData.append('Address', userData.address);

    const options: any = {
      headers: new HttpHeaders({
        Accept: 'text/html, application/xhtml+xml, */*',
      }),
      responseType: 'text',
    };

    try {
      const request = this.httpClient.post<string>(
        `${this.API_URL}/SignUp`,
        formData,
        options
      );
      const response: any = await lastValueFrom(request);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async sendLoggedUser(userData: any): Promise<boolean> {
    const formData = new FormData();
    formData.append('Email', userData.email);
    formData.append('Password', userData.password);

    const options: any = {
      headers: new HttpHeaders({
        Accept: 'text/html, application/xhtml+xml, */*',
      }),
      responseType: 'text',
    };

    try {
      const request = this.httpClient.post<string>(
        `${this.API_URLAuth}/Login`,
        formData,
        options
      );
      const response: any = await lastValueFrom(request);

      this.isUserLogged = true;
      localStorage.setItem('Token', response);
      this.imAdmin();
      return this.isUserLogged;
    } catch (error) {
      this.imAdmin;
      this.isUserLogged = false;
      throw error;
    }
  }

  public async imAdmin(): Promise<boolean> {
    const token = localStorage.getItem('Token');
    const options: any = {
      headers: new HttpHeaders({
        Accept: 'text/html, application/xhtml+xml, */*',
      }).set('Authorization', `Bearer ${token}`),
    };
    try {
      const request = this.httpClient.get(`${this.API_URL}/imAdmin`, options);
      const response: any = await lastValueFrom(request);
      this.adminStatusSubject.next(response);
      return response;
    } catch (error) {
      this.adminStatusSubject.next(false);
      throw error;
    }
  }

  public async getUser(): Promise<User> {
    try {
      const token = localStorage.getItem('Token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const request = this.httpClient
        .get(`${this.API_URL}/GetUserById`, { headers })
        .pipe(map((response: any) => this.mapToUser(response)));

      return await lastValueFrom(request);
    } catch (error) {
      throw error;
    }
  }
  public async getUserList(): Promise<User[]> {
    try {
      const token = localStorage.getItem('Token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const request = this.httpClient
        .get(`${this.API_URL}/Users`, { headers })
        .pipe(map((response: any) => response.map(this.mapToUser)));

      return await lastValueFrom(request);
    } catch (error) {
      throw error;
    }
  }
  private mapToUser(user: any): User {
    return {
      userId: user.userId,
      name: user.userName,
      role: user.role,
      email: user.email,
      address: user.address
    };
  }

  public async deleteUser(userId: number): Promise<string> {
    try {
      const token = localStorage.getItem('Token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const request = await this.httpClient.delete(
        `${this.API_URL}/deleteUser/${userId}`,
        {
          headers,
        }
      );
      const response: any = await lastValueFrom(request);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async changeUserRole(userId: number): Promise<string> {
    try {
      const token = localStorage.getItem('Token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const request = this.httpClient.put(
        `${this.API_URL}/changeRole/${userId}`,
        {},
        { headers }
      );
      const response: any = await lastValueFrom(request);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public logOut(){
    this.isUserLogged = false;
    localStorage.removeItem('Token')
  }

  public async getOrders(){
    try {
      const token = localStorage.getItem('Token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const request = this.httpClient.get(`${this.API_URL}/Orders`, { headers }).pipe(
        map((response: any) => response.map(this.mapToOrder))
      );
  
      return await lastValueFrom(request);
    } catch (error) {
      throw error;
    }
  }

  private mapToOrder(item: any): Order {
    return {
      orderId: item.orderId, 
      status: item.status,
      date: item.date,
      EURprice: item.euRprice,
      ETHprice: item.etHtotal
    };
  }
}
