import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductCart } from 'src/app/model/productCart';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public isUserLogged: boolean = localStorage.getItem('Token') ? true : false;
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

  public async getCart() {
    console.log(this.isUserLogged);
    if (this.isUserLogged === true) {
      try {
        this.cartList = await this.cartService.getCartByUserId();
        if (this.cartList == null || !(this.cartList.length > 0)) {
          this.displayMessage('El carrito está vacío');
        }
      } catch (error) {
        const errorHttp = error as HttpErrorResponse;
        const errorString = errorHttp.error
          ? errorHttp.error
          : (error as string);

        this.displayError(errorString);
        console.error('Error: ', error);
      }
    } else {
      this.getProductsInLocalCart();
    }
  }

  public async addToCart(productId: number) {
    if (this.isUserLogged === true)
      try {
        const response = await this.cartService.addProductToCart(productId);
        console.log(response);
        this.displayMessage(response);
      } catch (error) {
        const errorHttp = error as HttpErrorResponse;
        const errorString = errorHttp.error
          ? errorHttp.error
          : (error as string);
        this.displayError(errorString);
        console.error('Error: ', error);
      }
    else {
      this.addProductToLocalCart(productId);
      this.getProductsInLocalCart();
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
    this.getCart();
  }

  public displayError(errorMessage: string) {
    this.message = '';
    this.errorMessage = errorMessage;
  }

  public displayMessage(message: string) {
    this.errorMessage = '';
    this.message = message;
  }

  public addProductToLocalCart(productId: number) {
    try {
      var cart = JSON.parse(localStorage.getItem('cart') || '{}');
      if (cart[productId]) {
        cart[productId]++;
      } else {
        cart[productId] = 1;
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      this.getProductsInLocalCart();
    } catch (error) {
      console.error('Error al añadir producto al carrito:', error);
    }
  }

  public getProductsInLocalCart() {
    try {
      var cart = JSON.parse(localStorage.getItem('cart') || '{}');
      var products = [];
      for (var productId in cart) {
        products.push({
          productId: productId,
          amount: cart[productId],
        });
      }
      return products;
    } catch (error) {
      console.error('Carrito vacio', error);
      return [];
    }
  }
}
