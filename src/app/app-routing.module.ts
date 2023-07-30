import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './common/components/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './common';
import { Role } from './models';
import { HomeComponent } from './pages/home/home.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { UserProductsComponent } from './pages/products/user-products/user-products.component';

const routes: Routes = [
  {
    path: 'products',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ProductsListComponent,
        canActivate: [AuthGuard],
        data: { role: Role.Admin },
      },
    ],
  },
  {
    path: 'user-products',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: UserProductsComponent,
        canActivate: [AuthGuard],
        data: { role: Role.User },
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
