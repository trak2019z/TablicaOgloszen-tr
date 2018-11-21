import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsListComponent, CreateGroupComponent, EditGroupComponent } from './index';
import { GroupGuardService } from "../auth/guards/group-guard.service";

const groupsRouting: Routes = [
  {
    path: 'groups',
    canActivate: [GroupGuardService],
    children: [
      {
        path: '',
        component: GroupsListComponent
      },
      {
        path: 'create',
        component: CreateGroupComponent
      },
      {
        path: ':id',
        component: EditGroupComponent
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(groupsRouting)
  ],
  exports: [
    RouterModule
  ]
})
export class GroupsRoutingModule {
}
