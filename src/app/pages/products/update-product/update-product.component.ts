import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromStore from '../../../store';
import { Product } from 'src/app/models';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.sass'],
})
export class UpdateProductComponent implements OnInit, OnDestroy {
  form: FormGroup;

  product: Product;

  categories: [];

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
    public dialogRef: MatDialogRef<UpdateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private fromStore$: Store<fromStore.ConfigurationsState>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();

    this.product = this.data;
    this.form.patchValue({ ...this.data });
  }

  initForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  editProduct() {
    this.fromStore$.dispatch(
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
