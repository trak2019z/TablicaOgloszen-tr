import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AuthRoutingModule } from './auth.routing.module';
import { SharedModule } from '../shared/shared.module';

import { LoginComponent, SignUpComponent } from './index';

import { UserService } from './services/user.service';
import { HomeGuardService } from './guards/home-guard.service';
import { LoginGuardService } from './guards/login-guard.service';
import { SignUpGuardService } from './guards/sign-up-guard.service';
import { GroupGuardService } from './guards/group-guard.service';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AuthRoutingModule,
    SharedModule
  ],
  providers: [
    UserService,
    HomeGuardService,
    LoginGuardService,
    SignUpGuardService,
    GroupGuardService
  ],
  exports: []
})
export class AuthModule {
}
