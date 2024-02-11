import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  product: Product = new Product();
  id: number = 0;

  constructor(
    public productService: ProductService,
    public cartService: CartService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('productId') as unknown as number;
    this.getProduct()
  }

  /**
   * Fills the product array
   */
  public async getProduct() {
    this.product = await this.productService.requestProductById(this.id);
  }

  public async addToCart(productId: number) {
    console.log("hola");
    
    try {
      this.cartService.addProductToCart(productId);
    } catch (error) {
      console.error('Error: ', error);
    }
  }
}
