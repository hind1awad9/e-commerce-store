import { createAction, props } from '@ngrx/store';
import { Product } from '../../models';

/**
 * The categories action types.
 */
export enum CategoriesActionType {
  SEARCH_CATEGORIES = '[Categories] Search categories',
  SEARCH_CATEGORIES_FAIL = '[Categories] Search categories Fail',
  SEARCH_CATEGORIES_SUCCESS = '[Categories] Search categories Success',

  GET_PRODUCTS_BY_CATEGORY = '[Categories] Get Products By category',
  GET_PRODUCTS_BY_CATEGORY_FAIL = '[Categories] Get Products By category Fail',
  GET_PRODUCTS_BY_CATEGORY_SUCCESS = '[Categories] Get Products By category Success',
}

/**
 * Represents a store categories search action.
 */
export const SearchCategories = createAction(
  CategoriesActionType.SEARCH_CATEGORIES,
  props<any>()
);

/**
 * Represents a store categories search fail action.
 */
export const SearchCategoriesFail = createAction(
  CategoriesActionType.SEARCH_CATEGORIES_FAIL,
  props<any>()
);

/**
 * Represents a store categories search success action.
 */
export const SearchCategoriesSuccess = createAction(
  CategoriesActionType.SEARCH_CATEGORIES_SUCCESS,
  props<{ categories: string[] }>()
);

/**
 * Represents a store categories search action.
 */
export const GetProductsByCategory = createAction(
  CategoriesActionType.GET_PRODUCTS_BY_CATEGORY,
  props<{ category: string }>()
);

/**
 * Represents a store categories search fail action.
 */
export const GetProductsByCategoryFail = createAction(
  CategoriesActionType.GET_PRODUCTS_BY_CATEGORY_FAIL,
  props<any>()
);

/**
 * Represents a store categories search success action.
 */
export const GetProductsByCategorySuccess = createAction(
  CategoriesActionType.GET_PRODUCTS_BY_CATEGORY_SUCCESS,
  props<{ products: Product[] }>()
);

/**
 * Categories action types.
 */
export const CategoriesActions = {
  SearchCategories,
  SearchCategoriesFail,
  SearchCategoriesSuccess,
  GetProductsByCategory,
  GetProductsByCategoryFail,
  GetProductsByCategorySuccess,
};
