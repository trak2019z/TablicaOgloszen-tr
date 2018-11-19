import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HomeGuardService } from './auth/guards/home-guard.service';
import { PageNotFoundComponent } from "./core";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [HomeGuardService]
  },
  // {
  //   path: 'groups',
  //   loadChildren: './groups/groups.module#GroupsModule',
  //   canLoad: [GroupGuardService]
  // },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
