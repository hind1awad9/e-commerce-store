import { Product } from '../../models';

/**
 * Represents the Products state.
 */
export interface ProductsState {
  /**
   * The list of Products.
   */
  products: Product[];

  /**
   * An error that may resulting during processing some actions.
   */
  error: any;

  /**
   * The current selected Product.
   */
  selectedProduct: Product | null;

  /**
   * Determines if there is a running get process.
   */
  isGetting: boolean;

  /**
   * Determines if the last get process has been ended successfully.
   */
  isGetCompleted: boolean;

  /**
   * Determines if there is a running find-product process.
   */
  isFinding: boolean;

  /**
   * Determines if the last find-product process has been ended successfully.
   */
  isFindCompleted: boolean;

  /**
   * Determines if there is a running create process.
   */
  isCreating: boolean;

  /**
   * Determines if the last create process has been ended successfully.
   */
  isCreateCompleted: boolean;

  /**
   * Determines if there is a running update process.
   */
  isUpdating: boolean;

  /**
   * Determines if the last update process has been ended successfully.
   */
  isUpdateCompleted: boolean;

  /**
   * Determines if there is a running delete process.
   */
  isDeleting: boolean;

  /**
   * Determines if the last delete process has been ended successfully.
   */
  isDeleteCompleted: boolean;
}
