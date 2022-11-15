import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PublicComponent} from './public.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Page404Component } from './page404/page404.component';
import { ForbiddentComponent } from './forbiddent/forbiddent.component';


@NgModule({
  declarations: [
    PublicComponent,
    LoginComponent,
    RegisterComponent,
    Page404Component,
    ForbiddentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PublicModule {
}
