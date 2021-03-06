import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Product } from './product';
import { PRODUCTS } from './mock-products';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProductService {
  private host = 'http://localhost:3000/';
  private getAllProductsUrl = this.host + 'getAllProducts';
  private getProductsUrl = this.host + 'getProducts';
  private getProductUrl = this.host + 'getProduct';
  private addProductUrl = this.host + 'addProduct';
  private deleteProductUrl = this.host + 'deleteProduct';
  private updateProductUrl = this.host + 'updateProduct';
  private products;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.getAllProductsUrl, httpOptions)
      .pipe(
        tap(results => {
          this.products = results.products;
        })
      );
  }

  getProducts(query?: object): Observable<Product[]> {
    return this.http.post<Product[]>(this.getProductsUrl, query, httpOptions);
  }

  getProduct(id: string): Observable<Product> {
    if (this.products) {
      return of(this.products.find(product => product._id === id));
    } else {
      return this.http.post<Product>(this.getProductUrl, { _id: id }, httpOptions);
    }
  }

  addProduct(product: object): Observable<Product> {
    return this.http.post<Product>(this.addProductUrl, product, httpOptions)
      .pipe(
        catchError(this.handleError<Product>('addProduct'))
      );
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.post<Product>(this.deleteProductUrl, { _id: id }, httpOptions);
  }

  updateProduct(product: object): Observable<Product> {
    return this.http.post<Product>(this.updateProductUrl, product, httpOptions);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
