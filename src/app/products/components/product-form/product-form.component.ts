import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Store, select } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';

import * as fromStore from '../../store';
import { Product } from 'App/products/models';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  /**
   * The product form.
   */
  form: FormGroup;

  /**
   * The current edited product.
   */
  product: Product;

  /**
   * The list of categories.
   */
  categories: string[];

  /**
   * The set of subscriptions on this components,
   * these subscriptions must be unsubscribed before this component got destroyed.
   */
  subscriptions = new Subscription();

  /**
   * @param dialogRef The dialog reference.
   * @param configurationStore$ The configuration store.
   * @param formBuilder$ The form builder.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    private configurationStore$: Store<fromStore.ConfigurationsState>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();

    if (this.data) {
      this.product = this.data;
      this.form.patchValue({ ...this.data });
    }

    /**
     * Get the System categories.
     */
    this.getCategories();
  }
  initForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  getCategories() {
    this.subscriptions.add(
      this.configurationStore$
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
    this.configurationStore$.dispatch(fromStore.SearchCategories({}));
  }
  addProduct() {
    this.configurationStore$.dispatch(fromStore.CreateProduct(this.form.value));
    this.close();
  }

  editProduct() {
    this.configurationStore$.dispatch(
      fromStore.UpdateProduct({
        ...this.form.value,
        id: this.product.id,
        title: this.form.value.title,
        price: this.form.value.price,
        category: this.form.value.category,
        description: this.form.value.description,
      })
    );
    this.close();
  }

  close() {
    this.dialogRef.close();
    this.form.reset();
  }

  /**
   * Destroy component data
   */
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
