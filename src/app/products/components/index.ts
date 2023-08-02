import { ProductFormComponent } from './product-form/product-form.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { UserProductsComponent } from './user-products/user-products.component';
import { HomeComponent } from './home/home.component';

export * from './user-products/user-products.component';
export * from './products-list/products-list.component';
export * from './product-form/product-form.component';
export * from './home/home.component';

/**
 * The set of components registered on this sub-module.
 */
export const Components: any[] = [
  UserProductsComponent,
  ProductsListComponent,
  ProductFormComponent,
  HomeComponent,
];
