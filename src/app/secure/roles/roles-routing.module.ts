import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleCreateComponent } from './role-create/role-create.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { RolesComponent } from './roles.component';

const routes: Routes = [
  {path:'',component: RolesComponent},
  {path: 'create', component: RoleCreateComponent},
  {path: ':id/edit', component: RoleEditComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
