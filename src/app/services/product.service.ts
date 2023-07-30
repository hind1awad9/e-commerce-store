import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

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

  create(data: Product): Observable<Product> {
    return this.httpClient.post<Product>(
      `${this.fakeStoreApi}${this.productApi}`,
      data
    );
  }
  getProducts(limit = 10): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `${this.fakeStoreApi}${this.productApi}?limit=${limit}`
    );
  }
  findProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(
      `${this.fakeStoreApi}${this.productApi}/${id}`
    );
  }
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `${this.fakeStoreApi}${this.productApi}/category/${category}`
    );
  }

  getCategories(): Observable<[]> {
    return this.httpClient.get<[]>(
      `${this.fakeStoreApi}${this.productApi}/categories`
    );
  }

  /**
   * Updates an existing product data using the provided data.
   * @param data The updated product data.
   */
  update(data: Product): Observable<Product> {
    return this.httpClient.put<Product>(
      `${this.fakeStoreApi}${this.productApi}/${data.id}`,
      data
    );
  }

  /**
   * Deletes the product by given id.
   * @param id The id of the product.
   */
  delete(id: number): Observable<Product> {
    return this.httpClient.delete<Product>(
      `${this.fakeStoreApi}${this.productApi}/${id}`
    );
  }
}
