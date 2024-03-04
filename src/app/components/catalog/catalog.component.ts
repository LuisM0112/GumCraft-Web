import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  filterText: string = '';

  errorMessage: string = '';
  message: string = '';

  productList: Product[] = [];

  azFilterStatus: boolean = false;
  priceFilterStatus: boolean = false;

  constructor(
    public productService: ProductService,
    public cartService: CartService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  updateFilterText(event: any){
    this.filterText = event.filter;
  }

  getProductsFiltered(): Product[] {
    let result: Product[] = this.productList.slice();;

    if (this.filterText) {
      result = result.filter((product) => product.name.includes(this.filterText));
    }

    if (this.azFilterStatus) {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (this.priceFilterStatus) {
        result.sort((a, b) => a.eurPrice - b.eurPrice);
    }

    return result;
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

  changeFilterAZStatus(): void {
    this.azFilterStatus = !this.azFilterStatus;
    setTimeout(() => {
      this.cdRef.detectChanges();
    });
  }
  changeFilterPriceStatus(): void {
    this.priceFilterStatus = !this.priceFilterStatus;
    setTimeout(() => {
      this.cdRef.detectChanges();
    });
  }
}
