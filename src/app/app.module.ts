import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProductsComponent } from './products/products.component';

import { ProductService } from './product.service';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ ProductService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
