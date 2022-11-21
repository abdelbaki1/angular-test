import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    // UserCreateComponent,
    // UserEditComponent,
    // UsersComponent
  ],
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    UsersRoutingModule,
  ]
})
export class UsersModule { 
  constructor() {
    console.log('userModule loaded.');
  }
 
}
