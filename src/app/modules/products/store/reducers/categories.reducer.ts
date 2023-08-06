import { Action, createReducer, on } from '@ngrx/store';

import { CategoriesActions } from '../actions/categories.action';
import { CategoriesState } from '../states/categories.state';

/**
 * The initial state from which the state starts.
 */
const initialState: CategoriesState = {
  categories: [],
  products: [],
  error: null,
  isSearching: false,
  isSearchCompleted: false,
  isFindingProductsByCategory: false,
  isFindProductsByCategoryCompleted: false,
  selectedCategory: null,
};

const reducer = createReducer(
  initialState,

  //#region SEARCH_CATEGORIES
  on(CategoriesActions.SearchCategories, (state): CategoriesState => {
    return {
      ...state,
      isSearching: true,
      isSearchCompleted: false,
      error: null,
    };
  }),

  on(
    CategoriesActions.SearchCategoriesFail,
    (state, error): CategoriesState => {
      return {
        ...state,
        error,
        isSearching: false,
        isSearchCompleted: false,
      };
    }
  ),

  on(
    CategoriesActions.SearchCategoriesSuccess,
    (state, { categories }): CategoriesState => {
      return {
        ...state,
        categories,
        error: null,
        isSearching: false,
        isSearchCompleted: true,
      };
    }
  ),

  //#endregion SEARCH_CATEGORIES

  //#region GET_PRODUCTS_BY_CATEGORY
  on(CategoriesActions.GetProductsByCategory, (state): CategoriesState => {
    return {
      ...state,
      isFindingProductsByCategory: true,
      isFindProductsByCategoryCompleted: false,
      error: null,
    };
  }),

  on(
    CategoriesActions.GetProductsByCategoryFail,
    (state, error): CategoriesState => {
      return {
        ...state,
        error,
        isFindingProductsByCategory: false,
        isFindProductsByCategoryCompleted: false,
      };
    }
  ),

  on(
    CategoriesActions.GetProductsByCategorySuccess,
    (state, { products }): CategoriesState => {
      return {
        ...state,
        products,
        error: null,
        isFindingProductsByCategory: false,
        isFindProductsByCategoryCompleted: true,
      };
    }
  )

  //#endregion GET_PRODUCTS_BY_CATEGORY
);

/**
 * The reducer function that is called in each action dispatch against the state.
 * @param state The current state.
 * @param action The action that will affect the state.
 */
export function categoriesReducer(
  state: CategoriesState = initialState,
  action: Action
): CategoriesState {
  return reducer(state, action);
}
