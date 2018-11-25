import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsListComponent, CreateGroupComponent, EditGroupComponent } from './index';

const groupsRouting: Routes = [
  {
    path: '',
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
