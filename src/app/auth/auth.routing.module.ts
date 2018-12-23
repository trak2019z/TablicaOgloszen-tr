import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent, SignUpComponent } from './index';
import { LoginGuardService } from './guards/login-guard.service';
import { SignUpGuardService } from './guards/sign-up-guard.service';

const authRouting: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuardService]
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [SignUpGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRouting)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {
}
