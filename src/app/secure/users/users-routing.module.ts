import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {path:'',component:UsersComponent},
  
      // {path: 'users', component: UsersComponent},
      {path: 'create', component: UserCreateComponent},
      {path: ':id/edit', component: UserEditComponent}
    
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
