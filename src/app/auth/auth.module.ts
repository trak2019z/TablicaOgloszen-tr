import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth.routing.module';
import { SharedModule } from '../shared/shared.module';

import { LoginComponent, SignUpComponent } from './index';

import { UserService } from './user.service';
import { HomeGuardService } from './guards/home-guard.service';
import { LoginGuardService } from './guards/login-guard.service';
import { SignUpGuardService } from './guards/sign-up-guard.service';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule
  ],
  providers: [
    UserService,
    HomeGuardService,
    LoginGuardService,
    SignUpGuardService,
  ],
  exports: []
})
export class AuthModule {
}
