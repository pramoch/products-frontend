import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  name: String;
  category: String;
  brand: String;
  os: String;
  price: String;

  categories = [
    'Mobile Phone'
  ];

  osOptions = [
    'iOS',
    'Android'
  ];

  constructor() { }

  ngOnInit() {
    this.category = this.categories[0];
    this.os = this.osOptions[0];
    // this.name = 'iPhone X';
    // this.brand = 'Apple';
    // this.price = '1149';
  }

  onButtonClick() {
    console.log('name: ' + this.name);
    console.log('category: ' + this.category);
    console.log('brand: ' + this.brand);
    console.log('os: ' + this.os);
    console.log('price: ' + this.price);
  }

}
