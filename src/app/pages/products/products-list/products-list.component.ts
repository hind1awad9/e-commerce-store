import { OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';

import { Subscription } from 'rxjs';
import { skip, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { Product } from 'src/app/models';
import * as fromStore from '../../../store';
import { CreateProductComponent } from '../create-product/create-product.component';
import { UpdateProductComponent } from '../update-product/update-product.component';

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

  // getter lang
  get language() {
    return localStorage.getItem('language');
  }

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

    /**
     * Display toaster after delete product completed.
     */
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
    this.dialog.open(CreateProductComponent, {
      width: '40%',
      direction: this.language == 'ar' ? 'rtl' : 'ltr',
    });
  }
  openUpdateDialog(product: Product) {
    this.dialog.open(UpdateProductComponent, {
      width: '30%',
      direction: this.language == 'ar' ? 'rtl' : 'ltr',
      data: product,
    });
  }

  openDeleteDialog(templateRef: any, product: Product) {
    this.productId = product.id;
    this.dialog.open(templateRef, {
      width: '25%',
      direction: this.language == 'ar' ? 'rtl' : 'ltr',
    });
  }

  deleteProduct() {
    this.fromStore$.dispatch(
      fromStore.DeleteProduct({
        id: this.productId,
      })
    );
    this.close();
  }
  close() {
    this.dialog.closeAll();
  }

  /**
   * Destroy component data
   */
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
