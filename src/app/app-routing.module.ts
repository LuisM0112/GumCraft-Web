import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { UserComponent } from './components/user/user.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminComponent } from './components/admin/admin.component';
import { ConfirmPurchaseComponent } from './components/confirm-purchase/confirm-purchase.component';
import { HealthComponent } from './components/health/health.component';
import { AboutUsComponent } from './components/about-us/about-us.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'catalog',
    component: CatalogComponent,
  },
  {
    path: 'product/:productId',
    component: ProductComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'confirmPurchase',
    component: ConfirmPurchaseComponent,
  },
  {
    path: 'health',
    component: HealthComponent,
  },{
    path: 'aboutUs',
    component: AboutUsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
