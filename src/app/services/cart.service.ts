import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { lastValueFrom, map } from 'rxjs';
import { ProductCart } from '../model/productCart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private API_URL = 'http://localhost:5215/api/Gumcraft'; // Asegúrate de reemplazar esto con la URL de tu API

  constructor(private httpClient: HttpClient) {}

  public async getCartByUserId(): Promise<ProductCart[]> {
    const userID = UserService.getUserId();
    console.log(userID);

    const request = this.httpClient
      .get(`${this.API_URL}/cart/${userID}/products`)
      .pipe(map((response: any) => response.map(this.mapToItem)));

    return await lastValueFrom(request);
  }

  private mapToItem(item: any): ProductCart {
    return {
      productId: item.productId,
      name: item.name,
      amount: item.amount,
      price: item.price,
    };
  }
}
