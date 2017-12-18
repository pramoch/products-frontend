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
  private getProductsUrl = this.host + 'getProducts';
  private getProductUrl = this.host + 'getProduct';
  private addUrl = this.host + 'addProduct';
  private deleteProductUrl = this.host + 'deleteProduct';
  private products;

  constructor(private http: HttpClient) { }

  getProducts(query?: object): Observable<Product[]> {
    return this.http.post<Product[]>(this.getProductsUrl, query, httpOptions)
      .pipe(
        tap(products => {
          this.products = products;
        })
      );
  }

  getProduct(id: string): Observable<Product> {
    if (this.products) {
      return of(this.products.find(product => product._id === id));
    } else {
      return this.http.post<Product>(this.getProductUrl, { _id: id }, httpOptions);
    }
  }

  addProduct(product: object): Observable<Product> {
    return this.http.post<Product>(this.addUrl, product, httpOptions)
      .pipe(
        catchError(this.handleError<Product>('addProduct'))
      );
  }

  deleteProduct(id: string): Observable<string> {
    return this.http.post<string>(this.deleteProductUrl, { _id: id }, httpOptions);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
