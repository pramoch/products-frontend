import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProductsComponent } from './products/products.component';

import { ProductService } from './product.service';
import { AppRoutingModule } from './/app-routing.module';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ProductsComponent,
    ManageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ ProductService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
