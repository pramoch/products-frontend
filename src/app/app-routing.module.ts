import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { ManageComponent } from './manage/manage.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'manage', component: ManageComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
