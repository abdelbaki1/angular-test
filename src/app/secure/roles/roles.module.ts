import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleCreateComponent } from './role-create/role-create.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { RolesComponent } from './roles.component';


@NgModule({
  declarations: [
    // RoleCreateComponent,
    // RoleEditComponent,
    // RolesComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    RolesRoutingModule
  ]
})
export class RolesModule { }
