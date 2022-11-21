import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SecureModule} from './secure/secure.module';
import {PublicModule} from './public/public.module';
import { NgSelectModule } from '@ng-select/ng-select';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CredentialInterceptor} from './interceptors/credential.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthUsersService } from './secure/users/auth-users.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SecureModule,
    PublicModule,
    NgSelectModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialInterceptor,
      multi: true
    },AuthUsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
