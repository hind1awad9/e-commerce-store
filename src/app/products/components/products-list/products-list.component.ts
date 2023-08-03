import { OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';

import { Subscription } from 'rxjs';
import { skip, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { Product } from 'App/products/models';
import * as fromStore from '../../store';
import { ProductFormComponent } from '../product-form/product-form.component';
import { UiDirectionService } from 'App/core/services';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.sass'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[];
  productId: number;
  displayedColumns: string[] = [
    'id',
    'title',
    'price',
    'category',
    'description',
    'edit',
    'delete',
  ];

  resultsLength = 0;

  /**
   * The set of subscriptions on this components,
   * these subscriptions must be unsubscribed before this component got destroyed.
   */
  subscriptions = new Subscription();

  constructor(
    public dialog: MatDialog,
    private fromStore$: Store<fromStore.ConfigurationsState>,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    /**
     * Get the System products.
     */
    this.getProducts();

    /**
     * Display toaster after delete product completed.
     */
    this.deletedProduct();
  }

  getProducts() {
    this.subscriptions.add(
      this.fromStore$
        .pipe(
          select(fromStore.getProducts),
          tap((products) => {
            if (products) {
              this.products = products;
              this.resultsLength = products.length;
            }
          })
        )
        .subscribe()
    );
    this.fromStore$.dispatch(fromStore.GetProducts({}));
  }

  deletedProduct() {
    this.subscriptions.add(
      this.fromStore$
        .pipe(
          select(fromStore.getSelectedProductDeleteCompleted),
          skip(1),
          tap((deleted) => {
            if (deleted) {
              this.toastr.success(
                this.translate.instant('PRODUCT.DELETE_SUCCESS'),
                this.translate.instant('PRODUCT.SUCCESS')
              );
            }
          })
        )
        .subscribe()
    );
  }

  openCreateDialog() {
    this.dialog.open(ProductFormComponent, {
      width: '40%',
      direction: UiDirectionService.getCurrentDirection(),
    });
  }

  openUpdateDialog(product: Product) {
    this.dialog.open(ProductFormComponent, {
      width: '30%',
      direction: UiDirectionService.getCurrentDirection(),
      data: product,
    });
  }

  openDeleteDialog(templateRef: any, product: Product) {
    this.productId = product.id;
    this.dialog.open(templateRef, {
      width: '25%',
      direction: UiDirectionService.getCurrentDirection(),
    });
  }

  deleteProduct() {
    this.fromStore$.dispatch(
      fromStore.DeleteProduct({
        id: this.productId,
      })
    );
    this.closeDialogs();
  }
  closeDialogs() {
    this.dialog.closeAll();
  }

  /**
   * Destroy component data
   */
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
