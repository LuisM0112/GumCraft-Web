import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './components/user/user.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmPurchaseComponent } from './components/confirm-purchase/confirm-purchase.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HealthComponent } from './components/health/health.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    UserComponent,
    CatalogComponent,
    ProductComponent,
    CartComponent,
    ConfirmPurchaseComponent,
    HealthComponent,
    SearchBarComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
