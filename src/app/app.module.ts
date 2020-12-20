import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { LoginComponent } from './data/login/login.component';
import { RegistrationComponent } from './data/registration/registration.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './data/home/home.component';
import { AlertComponent } from './data/alert/alert.component';
import { JwtInterceptor } from './service/jwtInterceptor';
import { ErrorInterceptor } from './service/errorInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
