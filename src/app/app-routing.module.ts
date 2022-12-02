import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './public/login/login.component';
import {RegisterComponent} from './public/register/register.component';
import {SecureComponent} from './secure/secure.component';
import {PublicComponent} from './public/public.component';
import {ProfileComponent} from './secure/profile/profile.component';
import {DashboardComponent} from './secure/dashboard/dashboard.component';
import {RolesComponent} from './secure/roles/roles.component';
import {RoleCreateComponent} from './secure/roles/role-create/role-create.component';
import {RoleEditComponent} from './secure/roles/role-edit/role-edit.component';
import {ProductsComponent} from './secure/products/products.component';
import {ProductCreateComponent} from './secure/products/product-create/product-create.component';
import {ProductEditComponent} from './secure/products/product-edit/product-edit.component';
import {OrdersComponent} from './secure/orders/orders.component';
import { Page404Component } from './public/page404/page404.component';
import { HomepageComponent } from './secure/homepage/homepage.component';
import { LogsComponent } from './secure/logs/logs.component';
import { OrderEditComponent } from './secure/orders/order-edit/order-edit.component';
import { OrderCreateComponent } from './secure/orders/order-create/order-create.component';
import { AuthUsersService } from './secure/users/auth-users.service';

const routes: Routes = [
  {
    path: '',
    component: SecureComponent,
    children: [
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path:'home',component:HomepageComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'roles',loadChildren:
      ()=>
        import('./secure/roles/roles.module').then(md => md.RolesModule)
      },
      {path: 'products',loadChildren:
      () => import('./secure/products/products.module').then(mod => mod.ProductsModule)},
      {path: 'orders', component: OrdersComponent},
      {path: 'orders/create', component: OrderCreateComponent},
      {path: 'orders/:id/edit', component: OrderEditComponent},
      {path:'logs',
      loadChildren:
      ()=> import('./secure/logs/logs.module').then(md=>md.LogsModule)
      // ,canLoad:[AuthUsersService] 
    },
      {path:'users',
        loadChildren:
         () => import('./secure/users/users.module').then(mod => mod.UsersModule)
        ,canLoad:[AuthUsersService] 
        }
    ]
  },
  {
    path: '',
    component: PublicComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
    ]
  },
  {path:'**',component:Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
