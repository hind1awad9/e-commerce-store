import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { Store, select } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';

import * as fromStore from '../../../store';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.sass'],
})
export class CreateProductComponent implements OnInit, OnDestroy {
  form: FormGroup;

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
    public dialogRef: MatDialogRef<CreateProductComponent>,
    private fromStore$: Store<fromStore.ConfigurationsState>,
    private formBuilder: FormBuilder
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
