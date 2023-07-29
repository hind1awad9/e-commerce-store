import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { CategoriesActions } from '../actions/categories.action';
import { ProductService } from 'src/app/services';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductService
  ) {}

  /* ========================= SEARCH_CATEGORIES =================================== */
  searchCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.SearchCategories),
      switchMap(() =>
        this.productsService.getCategories().pipe(
          map((response) =>
            CategoriesActions.SearchCategoriesSuccess({ categories: response })
          ),
          catchError((error) =>
            of(CategoriesActions.SearchCategoriesFail(error))
          )
        )
      )
    )
  );

  /* ========================= GET_PRODUCTS_BY_CATEGORY =================================== */
  getProductsByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.GetProductsByCategory),
      switchMap(({ category }) =>
        this.productsService.getProductsByCategory(category).pipe(
          map((response) =>
            CategoriesActions.GetProductsByCategorySuccess({
              products: response,
            })
          ),
          catchError((error) =>
            of(CategoriesActions.GetProductsByCategoryFail(error))
          )
        )
      )
    )
  );
}
