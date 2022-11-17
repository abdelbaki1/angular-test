import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadComponent } from '../components/upload/upload.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProductsComponent } from './products.component';
import { SecureModule } from '../secure.module';


@NgModule({
  declarations: [
    // ProductCreateComponent,
    // ProductEditComponent,
    
  ],
  imports: [
    
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ProductsRoutingModule,
  
  ]
})
export class ProductsModule { }
