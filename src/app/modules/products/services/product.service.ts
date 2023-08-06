import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Product } from '../models/product.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private fakeStoreApi: string;
  private productApi: string;
  constructor(private httpClient: HttpClient) {
    this.fakeStoreApi = environment.fakeStoreApi;
    this.productApi = '/products';
  }

  /**
   * @description Create new product.
   * @param product product data
   * @returns {Observable<Product>}
   */
  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(
      `${this.fakeStoreApi}${this.productApi}`,
      product
    );
  }

  /**
   * @description Get list of products.
   * @param limit limit of products
   * @returns {Observable<Product[]>}
   */
  getProducts(limit = 10): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `${this.fakeStoreApi}${this.productApi}?limit=${limit}`
    );
  }

  /**
   * @description Get product details.
   * @param id product id
   * @returns {Observable<Product>}
   */
  findProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(
      `${this.fakeStoreApi}${this.productApi}/${id}`
    );
  }

  /**
   * @description Get list of products by category name.
   * @param category category name
   * @returns {Observable<Product[]>}
   */
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `${this.fakeStoreApi}${this.productApi}/category/${category}`
    );
  }

  /**
   * @description Get list of categories.
   * @returns {Observable<string[]>}
   */
  getCategories(): Observable<string[]> {
    return this.httpClient.get<string[]>(
      `${this.fakeStoreApi}${this.productApi}/categories`
    );
  }

  /**
   * @description Updates an existing product data using the provided data.
   * @param product The updated product data.
   * @returns {Observable<Product>}
   */
  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(
      `${this.fakeStoreApi}${this.productApi}/${product.id}`,
      product
    );
  }

  /**
   * @description Deletes the product by given id.
   * @param id The id of the product.
   * @returns {Observable<null>}
   */
  deleteProduct(id: number): Observable<null> {
    return this.httpClient.delete<null>(
      `${this.fakeStoreApi}${this.productApi}/${id}`
    );
  }
}
