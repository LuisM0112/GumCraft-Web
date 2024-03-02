import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { UserComponent } from './components/user/user.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
<<<<<<< Updated upstream
=======
import { ConfirmPurchaseComponent } from './components/confirm-purchase/confirm-purchase.component';
import { AdminComponent } from './components/admin/admin.component';
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======
  {
    path: 'confirmPurchase',
    component: ConfirmPurchaseComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
>>>>>>> Stashed changes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
