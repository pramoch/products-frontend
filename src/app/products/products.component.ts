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
  brands: Array<any>;
  oss: Array<any>;
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
          this.initBrands(results.brands);
          this.initOss(results.oss);
        });
  }

  initBrands(brands): void {
    this.brands = [];

    brands.forEach(brand => {
      this.brands.push({
        name: brand,
        isChecked: false
      });
    });
  }

  initOss(oss): void {
    this.oss = [];

    oss.forEach(os => {
      this.oss.push({
        name: os,
        isChecked: false
      });
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
    const oss = [];

    // Name
    if (this.name) {
      query['name'] = this.name;
    }

    // Brand
    this.brands.forEach(item => {
      if (item.isChecked) {
        brand.push(item.name);
      }
    });

    // OS
    this.oss.forEach(item => {
      if (item.isChecked) {
        oss.push(item.name);
      }
    });

    if (brand.length > 0) {
      query['brand'] = brand;
    }
    if (oss.length > 0) {
      query['os'] = oss;
    }

    this.getProducts(query);
  }
}
