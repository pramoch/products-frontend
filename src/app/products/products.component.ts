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
  isSamsung: boolean;
  isApple: boolean;
  isOppo: boolean;
  isAndroid: boolean;
  isiOS: boolean;
  name: string;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService
        .getAllProducts()
        .subscribe(results => {
          this.products = results.products;
        });
  }

  getProducts(query?: object): void {
    this.productService
        .getProducts(query)
        .subscribe(products => {
          this.products = products;
        });
  }

  updateQuery(): void {
    const query = {};
    const brand = [];
    const os = [];

    // Name
    if (this.name) {
      query['name'] = this.name;
    }

    // Brand
    if (this.isApple) {
      brand.push('Apple');
    }
    if (this.isSamsung) {
      brand.push('Samsung');
    }
    if (this.isOppo) {
      brand.push('OPPO');
    }

    // OS
    if (this.isAndroid) {
      os.push('Android');
    }
    if (this.isiOS) {
      os.push('iOS');
    }


    if (brand.length > 0) {
      query['brand'] = brand;
    }
    if (os.length > 0) {
      query['os'] = os;
    }

    this.getProducts(query);
  }
}
