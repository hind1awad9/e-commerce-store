import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards';
import {
  HomeComponent,
  ProductsListComponent,
  UserProductsComponent,
} from './products/components';
import { LoginComponent } from './auth/components';
import { LayoutComponent } from './core/components';
import { Role } from './core/enums';

const routes: Routes = [
  {
    path: 'products',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ProductsListComponent,
        canActivate: [AuthGuard],
        data: { role: Role.ADMIN },
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
        data: { role: Role.USER },
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
