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
  private url = 'http://localhost:3000/';
  private getUrl = this.url + 'getProducts';
  private addUrl = this.url + 'addProduct';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.getUrl);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.addUrl, product, httpOptions)
    .pipe(
      catchError(this.handleError<Product>('addProduct'))
    );
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
