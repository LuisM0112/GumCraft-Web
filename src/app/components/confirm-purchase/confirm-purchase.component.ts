import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductCart } from 'src/app/model/productCart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-confirm-purchase',
  templateUrl: './confirm-purchase.component.html',
  styleUrls: ['./confirm-purchase.component.css']
})
export class ConfirmPurchaseComponent implements OnInit {

  errorMessage: string = '';
  message: string = '';

  constructor(public cartService: CartService){}
  async ngOnInit(): Promise<void> {
    this.errorMessage = '';
    this.message = '';
    this.getCart();
  }

cartList: ProductCart[] = [];

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

  displayMessage(arg0: string) {
    throw new Error('Method not implemented.');
  }
  displayError(errorString: any) {
    throw new Error('Method not implemented.');
  }
}
