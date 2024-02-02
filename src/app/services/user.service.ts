import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API_URL: string = 'http://localhost:5000/api/gumcraft';

  constructor(private httpClient: HttpClient) {}

  public async sendNewUser(userData: any) {
    const options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text',
    };

    try {
      const response: any = await lastValueFrom(
        this.httpClient.post<string>(this.API_URL, userData, options)
      );
      console.log(response as string);
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  public async sendLogedUser(userData: any) {
    const options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text',
    };

    const request = this.httpClient.post<string>(
      this.API_URL,
      userData,
      options
    );
    const response: any = await lastValueFrom(request);
    console.log(response as string);
  }
}
