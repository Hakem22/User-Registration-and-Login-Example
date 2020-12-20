import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './data/home/home.component';
import { LoginComponent } from './data/login/login.component';
import { RegistrationComponent } from './data/registration/registration.component';
import { AuthGuardService } from './service/auth-guard.service';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
     // otherwise redirect to home
     { path: '**', redirectTo: '' }
]
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
