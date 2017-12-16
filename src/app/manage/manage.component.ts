import { Component, OnInit } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  name: string;
  category: string;
  brand: string;
  os: string;
  price: string;

  categories = [
    'Mobile Phone'
  ];

  osOptions = [
    'iOS',
    'Android'
  ];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.category = this.categories[0];
    this.os = this.osOptions[0];
    this.name = 'iPhone 8';
    this.brand = 'Apple';
    this.price = '849';
  }

  onButtonClick() {
    if (this.name && this.category && this.brand && this.os && this.price) {
      this.productService.addProduct({
        name: this.name,
        category: this.category,
        brand: this.brand,
        os: this.os,
        price: this.price
      })
      .subscribe(product => {
        console.log(product);
      });
    } else {
      console.log('Incomplete value');
    }
  }
}
