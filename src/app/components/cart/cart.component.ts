import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: any;

  constructor(private cartService: CartService) {}

  async ngOnInit(): Promise<void> {
    this.cart = await this.cartService.getCartByUserId(1);
  }
}
