import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { lastValueFrom, map } from 'rxjs';
import { ProductCart } from '../model/productCart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private API_URL = 'https://localhost:7065/api/Gumcraft';

  constructor(private httpClient: HttpClient) {}

  public async getCartByUserId(): Promise<ProductCart[]> {
    try {
      const token = localStorage.getItem('Token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const request = this.httpClient
        .get(`${this.API_URL}/cart/products`, { headers })
        .pipe(map((response: any) => response.map(this.mapToItem)));

      return await lastValueFrom(request);
    } catch (error) {
      throw error;
    }
  }

  private mapToItem(item: any): ProductCart {
    return {
      productId: item.productId,
      name: item.name,
      amount: item.amount,
      price: item.price,
    };
  }

  /**
   * addProductToCart
   */
  public async addProductToCart(productId: number): Promise<string> {
    const token = localStorage.getItem('Token');
    const options: any = {
      headers: new HttpHeaders({
        Accept: 'text/html, application/xhtml+xml, */*',
      }).set('Authorization', `Bearer ${token}`),
      responseType: 'text',
    };
    try {
      const request = this.httpClient.put(
        `${this.API_URL}/cart/product/${productId}`,
        ' ',
        options
      );
      const response: any = await lastValueFrom(request);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * removeProductFromCart
   */

  public async removeProductFromCart(productId: number): Promise<string> {
    const token = localStorage.getItem('Token');
    const options: any = {
      headers: new HttpHeaders({
        Accept: 'text/html, application/xhtml+xml, */*',
      }).set('Authorization', `Bearer ${token}`),
      responseType: 'text',
    };
    try {
      const request = this.httpClient.put(
        `${this.API_URL}/cart/productDel/${productId}`,
        ' ',
        options
      );
      const response: any = await lastValueFrom(request);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
