import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  productList: Product[] = [];

  constructor(public productService: ProductService) {}

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
}
