import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  errorMessage: string = '';
  message: string = '';

  productList: Product[] = [];

  constructor(
    public productService: ProductService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  /**
   * Fills the product array
   */
  public async getProducts() {
    this.productList = await this.productService.requestProducts();    
    console.log(this.productList);
  }

  public async addToCart(productId: number) {
    console.log("hola");
    
    try {
      const response = await this.cartService.addProductToCart(productId);
      console.log(response);
      this.displayMessage(response);
      
    } catch (error) {
      
      const errorHttp = error as HttpErrorResponse;
      const errorString = errorHttp.error? errorHttp.error : error as string;
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
