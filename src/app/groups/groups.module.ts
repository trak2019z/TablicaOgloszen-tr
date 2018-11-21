import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { GroupsRoutingModule } from './groups.routing.module';

import { GroupsListComponent, CreateGroupComponent, EditGroupComponent, RemoveGroupDialogComponent } from './index';

import { GroupsService } from './groups.service';

@NgModule({
  declarations: [
    CreateGroupComponent,
    GroupsListComponent,
    EditGroupComponent,
    RemoveGroupDialogComponent
  ],
  imports: [
    SharedModule,
    GroupsRoutingModule
  ],
  providers: [
    GroupsService
  ],
  exports: [
  ],
  entryComponents: [
    RemoveGroupDialogComponent
  ]
})
export class GroupsModule {
}
