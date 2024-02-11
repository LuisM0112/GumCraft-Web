import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API_URL: string = 'http://localhost:5215/api/Gumcraft';
  API_URLAuth: string = 'http://localhost:5215/api/Auth';

  isUserLogged: boolean = false;

  userJWT: string = '';
  static userID = 0;

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
      UserService.userID = response;
      return this.isUserLogged;
    } catch (error) {
      this.isUserLogged = false;
      throw error;
    }
  }

  public static getUserId(): number {
    return this.userID;
  }
}
