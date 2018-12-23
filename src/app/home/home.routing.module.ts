import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

const groupsRouting: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(groupsRouting)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule {
}
