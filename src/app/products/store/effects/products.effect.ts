import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { ProductsActions } from '../actions/products.action';
import { ProductService } from 'App/products/services';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductService,
    public toastr: ToastrService,
    private translate: TranslateService
  ) {}

  /* ========================= GET_PRODUCTS =================================== */
  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.GetProducts),
      switchMap(({ limit }) =>
        this.productsService.getProducts(limit).pipe(
          map((response) =>
            ProductsActions.GetProductsSuccess({ products: response })
          ),
          catchError((error) => of(ProductsActions.GetProductsFail(error)))
        )
      )
    )
  );

  /* ========================= FIND_PRODUCT =================================== */
  find$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.FindProduct),
      switchMap((data) =>
        this.productsService.findProductById(data.id).pipe(
          map((response) => ProductsActions.FindProductSuccess(response)),
          catchError((error) => of(ProductsActions.FindProductFail(error)))
        )
      )
    )
  );

  findFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.FindProductFail),
        tap(({ statusCode }) => {
          if (statusCode === 400) {
            // this.notificationService.dispatchErrorMessage(this.translationService.translate('PRODUCT_NOT_FOUND'));
          }
        })
      ),
    { dispatch: false }
  );

  /* ========================= CREATE_PRODUCT =================================== */
  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.CreateProduct),
      switchMap((data) =>
        this.productsService.createProduct(data).pipe(
          map((response) => ProductsActions.CreateProductSuccess(response)),
          catchError((error) => of(ProductsActions.CreateProductFail(error)))
        )
      )
    )
  );

  createProductSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.CreateProductSuccess),
        tap(() => {
          this.toastr.success(
            this.translate.instant('PRODUCT.ADD_SUCCESS'),
            this.translate.instant('PRODUCT.SUCCESS')
          );
        })
      ),
    { dispatch: false }
  );

  createProductFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.CreateProductFail),
        tap(() => {
          this.toastr.error(
            this.translate.instant('PRODUCT.ADD_FAIL'),
            this.translate.instant('PRODUCT.ERROR')
          );
        })
      ),
    { dispatch: false }
  );

  /* ========================= UPDATE_PRODUCT =================================== */
  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.UpdateProduct),
      switchMap((data) =>
        this.productsService.updateProduct(data).pipe(
          map((response) => ProductsActions.UpdateProductSuccess(response)),
          catchError((error) => of(ProductsActions.UpdateProductFail(error)))
        )
      )
    )
  );

  updateProductSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.UpdateProductSuccess),
        tap(() => {
          this.toastr.success(
            this.translate.instant('PRODUCT.EDIT_SUCCESS'),
            this.translate.instant('PRODUCT.SUCCESS')
          );
        })
      ),
    { dispatch: false }
  );

  updateProductFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.UpdateProductFail),
        tap(() => {
          this.toastr.error(
            this.translate.instant('PRODUCT.EDIT_FAIL'),
            this.translate.instant('PRODUCT.ERROR')
          );
        })
      ),
    { dispatch: false }
  );

  /* ========================= DELETE_PRODUCT =================================== */
  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.DeleteProduct),
      switchMap((data) =>
        this.productsService.deleteProduct(data.id).pipe(
          map((response) => ProductsActions.DeleteProductSuccess(data)),
          catchError((error) => of(ProductsActions.DeleteProductFail(error)))
        )
      )
    )
  );

  deleteFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.DeleteProductFail),
        tap(() => {
          this.toastr.error(
            this.translate.instant('PRODUCT.DELETE_FAIL'),
            this.translate.instant('PRODUCT.ERROR')
          );
        })
      ),
    { dispatch: false }
  );
}
