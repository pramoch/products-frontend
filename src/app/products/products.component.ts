import { Component, OnInit } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  isBrandSamsung: boolean;
  isBrandApple: boolean;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
    this.isBrandApple = false;
    this.isBrandSamsung = false;
  }

  getProducts(query?: object): void {
    this.productService.getProducts(query)
        .subscribe(products => this.products = products);
  }

  updateQuery(): void {
    const query = {};
    const brand = [];

    if (this.isBrandApple) {
      brand.push('Apple');
    }
    if (this.isBrandSamsung) {
      brand.push('Samsung');
    }

    if (brand.length > 0) {
      query['brand'] = brand;
    }

    this.getProducts(query);
  }
}
