import { OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { skip, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

import { Product } from 'src/app/models';
import * as fromStore from '../../store';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.sass'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  form: FormGroup;
  product: Product;
  products: Product[];
  categories: [];
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
    private dialog: MatDialog,
    private fromStore$: Store<fromStore.ConfigurationsState>,
    private formBuilder: FormBuilder,
    public toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.initForm();

    /**
     * Get the System categories.
     */
    this.subscriptions.add(
      this.fromStore$
        .pipe(
          select(fromStore.getCategories),
          tap((categories) => {
            if (categories) {
              this.categories = categories;
            }
          })
        )
        .subscribe()
    );
    this.fromStore$.dispatch(fromStore.SearchCategories({}));

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
     * Display toaster after update product completed.
     */
    this.subscriptions.add(
      this.fromStore$
        .pipe(
          select(fromStore.getSelectedProductUpdateCompleted),
          skip(1),
          tap((updated) => {
            if (updated) {
              this.toastr.success(
                this.translate.instant('PRODUCT.EDIT_SUCCESS'),
                this.translate.instant('PRODUCT.SUCCESS')
              );
            }
          })
        )
        .subscribe()
    );

    /**
     * Display toaster after create product completed.
     */
    this.subscriptions.add(
      this.fromStore$
        .pipe(
          select(fromStore.getSelectedProductCreateCompleted),
          skip(1),
          tap((create) => {
            if (create) {
              this.toastr.success(
                this.translate.instant('PRODUCT.ADD_SUCCESS'),
                this.translate.instant('PRODUCT.SUCCESS')
              );
            }
          })
        )
        .subscribe()
    );

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

  initForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  addProduct() {
    this.fromStore$.dispatch(fromStore.CreateProduct(this.form.value));
    this.close();
  }

  editProduct() {
    this.fromStore$.dispatch(
      fromStore.UpdateProduct({
        ...this.product,
        title: this.form.value.title,
        price: this.form.value.price,
        category: this.form.value.category,
        description: this.form.value.description,
      })
    );
    this.close();
  }

  deleteProduct() {
    this.fromStore$.dispatch(
      fromStore.DeleteProduct({
        id: this.productId,
      })
    );
    this.close();
  }

  openDialog(templateRef: any, element: Product) {
    this.productId = element.id;
    this.product = element;
    this.form.patchValue({ ...element });
    let dialogRef = this.dialog.open(templateRef, {
      width: '25%',
      direction: this.language == 'ar' ? 'rtl' : 'ltr',
    });
  }

  openCreateDialog(templateRef: any) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '40%',
      direction: this.language == 'ar' ? 'rtl' : 'ltr',
    });
  }

  close() {
    this.dialog.closeAll();
    this.form.reset();
  }

  /**
   * Destroy component data
   */
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
