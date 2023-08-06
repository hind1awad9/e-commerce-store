import { Product } from '../../models';

/**
 * Represents the Categories state.
 */
export interface CategoriesState {
  /**
   * The list of Categories.
   */
  categories: string[];

  /**
   * The list of products.
   */
  products: Product[];

  /**
   * An error that may resulting during processing some actions.
   */
  error: any;

  /**
   * Determines if there is a running search process.
   */
  isSearching: boolean;

  /**
   * Determines if the last search process has been ended successfully.
   */
  isSearchCompleted: boolean;

  /**
   * Determines if there is a running find process.
   */
  isFindingProductsByCategory: boolean;

  /**
   * Determines if the last find process has been ended successfully.
   */
  isFindProductsByCategoryCompleted: boolean;

  /**
   * The current selected category.
   */
  selectedCategory: any;
}
