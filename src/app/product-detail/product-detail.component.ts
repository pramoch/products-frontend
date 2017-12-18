import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;

  categories = [
    'Mobile Phone'
  ];

  osOptions = [
    'iOS',
    'Android'
  ];

  hideDeleteMessage = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService
        .getProduct(id)
        .subscribe(product => {
          this.product = product;
        });
  }

  onDeleteClick() {
    if (confirm('Are you sure you want to delete "' + this.product.name + '"')) {
       this.productService
           .deleteProduct(this.product._id)
           .subscribe(() => {
             this.product = null;
             this.hideDeleteMessage = false;
           });
    }
  }
}
