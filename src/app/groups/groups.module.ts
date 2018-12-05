import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { GroupsRoutingModule } from './groups.routing.module';

import {
  GroupsListComponent,
  CreateGroupComponent,
  EditGroupComponent,
  GroupUsersListComponent
} from './index';

import { GroupsService } from './groups.service';

@NgModule({
  declarations: [
    CreateGroupComponent,
    GroupsListComponent,
    EditGroupComponent,
    GroupUsersListComponent
  ],
  imports: [
    SharedModule,
    GroupsRoutingModule
  ],
  providers: [
    GroupsService
  ],
  exports: [
  ]
})
export class GroupsModule {
}
