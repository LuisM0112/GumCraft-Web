import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Subject, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API_URL: string = 'https://localhost:7065/api/Gumcraft';
  API_URLAuth: string = 'https://localhost:7065/api/Auth';
  private adminStatusSubject = new Subject<boolean>();
  adminStatus$ = this.adminStatusSubject.asObservable();

  isUserLogged: boolean = false;

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
}
