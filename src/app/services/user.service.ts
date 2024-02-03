import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API_URL: string = 'http://localhost:5215/api/Gumcraft';

  constructor(private httpClient: HttpClient) {}

  public async sendNewUser(userData: any) {

    const formData = new FormData();
    formData.append('userName', userData.userName);
    formData.append('email', userData.email);
    formData.append('address', userData.address);
    formData.append('password', userData.password);

    const options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text',
    };

    try {
      const request = this.httpClient.post<string>(`${this.API_URL}/SignUp`, formData, options)
      const response: any = await lastValueFrom(request);
      console.log(response as string);
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  public async sendLoggedUser(userData: any) {
    const options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text',
    };

    try {
      const response: any = await lastValueFrom(
        this.httpClient.post<string>(`${this.API_URL}/Login`, userData, options)
      );
      console.log(response as string);
    } catch (error) {
      console.error('Error: ', error);
    }
  }
}
