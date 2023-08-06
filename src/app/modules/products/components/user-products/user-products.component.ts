import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Subscription, skip, tap } from 'rxjs';

import * as fromStore from '../../store';
import { Product } from '../../models';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.sass'],
})
export class UserProductsComponent implements OnInit, OnDestroy {
  /**
   * List of categories.
   */
  categories: string[];

  /**
   * List of products.
   */
  products: Product[];

  /**
   * The set of subscriptions on this components,
   * these subscriptions must be unsubscribed before this component got destroyed.
   */
  subscriptions = new Subscription();

  constructor(private fromStore$: Store<fromStore.ConfigurationsState>) {}

  ngOnInit(): void {
    /**
     * Get the System products.
     */
    this.getProducts();

    /**
     * Get the System categories.
     */
    this.getCategories();
  }

  getProducts() {
    this.subscriptions.add(
      this.fromStore$
        .pipe(
          select(fromStore.getProducts),
          tap((products) => {
            if (products) {
              this.products = products;
            }
          })
        )
        .subscribe()
    );
    this.fromStore$.dispatch(fromStore.GetProducts({}));
  }

  getCategories() {
    this.subscriptions.add(
      this.fromStore$
        .pipe(
          select(fromStore.getCategories),
          skip(1),
          tap((categories) => {
            if (categories) {
              this.categories = categories;
            }
          })
        )
        .subscribe()
    );
    this.fromStore$.dispatch(fromStore.SearchCategories({}));
  }

  searchByCategory(category: string) {
    this.subscriptions.add(
      this.fromStore$
        .pipe(
          select(fromStore.getProductsByCategory),
          tap((products) => {
            if (products) {
              this.products = products;
            }
          })
        )
        .subscribe()
    );

    this.fromStore$.dispatch(
      fromStore.GetProductsByCategory({ category: category })
    );
  }

  /**
   * Destroy component data
   */
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
