import { Component, OnInit } from '@angular/core';
import { ProductCart } from 'src/app/model/productCart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartList: ProductCart[] = [];
  constructor(private cartService: CartService) {}

  async ngOnInit(): Promise<void> {
    this.cartList = await this.cartService.getCartByUserId();
  }
}
