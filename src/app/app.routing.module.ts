import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './core';

import { HomeGuardService } from './auth/guards/home-guard.service';
import { GroupGuardService } from './auth/guards/group-guard.service';
import { NoticeGuardService } from './auth/guards/notice-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
    canLoad: [HomeGuardService],
  },
  {
    path: 'groups',
    loadChildren: './groups/groups.module#GroupsModule',
    canLoad: [GroupGuardService]
  },
  {
    path: 'notices',
    loadChildren: './notices/notices.module#NoticesModule',
    canLoad: [NoticeGuardService]
  },
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
  ],
  providers: [
  ]
})
export class AppRoutingModule {
}
