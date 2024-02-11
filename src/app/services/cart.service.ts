import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:5000/api/cart'; // Asegúrate de reemplazar esto con la URL de tu API

  constructor(private http: HttpClient) {}

  async getCartByUserId(userId: number): Promise<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get(url).toPromise();
  }
}

