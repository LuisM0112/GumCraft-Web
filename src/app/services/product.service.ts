import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API_URL: string = 'https://localhost:7065/api/Gumcraft';

  constructor(private httpClient: HttpClient) {}
  
  /**
   * Request products from the API
   * @return Promise<Product[]>
   */
  public async requestProducts(): Promise<Product[]> {

    const request = this.httpClient.get(`${this.API_URL}/Products`).pipe(
      map((response: any) => response.map(this.mapToProduct))
    );

    return await lastValueFrom(request);
  }

  private mapToProduct(item: any): Product {
    return {
      productId: item.productId, 
      name: item.name,
      description: item.description,
      image: item.image,
      stock: item.stock,
      eurPrice: item.euRprice,
      ethPrice: item.etHprice
    };
  }

  /**
   * Request products from the API
   * @return Promise<Product>
   */
  public async requestProductById(productId: number): Promise<Product> {

    const request = this.httpClient.get(`${this.API_URL}/Product/${productId}`).pipe(
      map(this.mapToProduct)
    );

    return await lastValueFrom(request);
  }
}
