import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {path:'',component: ProductsComponent},
  {path: 'create', component: ProductCreateComponent},
  {path: ':id/edit', component: ProductEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
