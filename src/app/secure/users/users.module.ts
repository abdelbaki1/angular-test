import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';


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
    UsersRoutingModule
  ]
})
export class UsersModule { 
  constructor() {
    console.log('userModule loaded.');
  }
 
}
