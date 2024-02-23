import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductCart } from 'src/app/model/productCart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  errorMessage: string = '';
  message: string = '';

  cartList: ProductCart[] = [];
  constructor(private cartService: CartService) {
    this.message = '';
    this.errorMessage = '';
  }

  async ngOnInit(): Promise<void> {
    this.errorMessage = '';
    this.message = '';
    this.getCart();
  }

  public async getCart(){
    try {

      this.cartList = await this.cartService.getCartByUserId();
      if (this.cartList == null || !(this.cartList.length > 0)) {
        this.displayMessage('El carrito está vacío');
      }

    } catch (error) {

      const errorHttp = error as HttpErrorResponse;
      const errorString = errorHttp.error? errorHttp.error : error as string;

      this.displayError(errorString);
      console.error('Error: ', error);
    }
  }

  public async addToCart(productId: number) {
    
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

  public async removeProductFromCart(productId: number) {
    try {

      const response = await this.cartService.removeProductFromCart(productId);
      console.log(response);
      this.displayMessage(response);

    } catch (error) {

      const errorHttp = error as HttpErrorResponse;
      this.displayError(errorHttp.error);
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
