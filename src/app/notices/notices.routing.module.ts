import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateNoticeComponent } from './create-notice/create-notice.component';
import { NoticesListComponent } from './notices-list/notices-list.component';

const noticeRouting: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: NoticesListComponent
      },
      {
        path: 'create',
        component: CreateNoticeComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(noticeRouting)
  ],
  exports: [
    RouterModule
  ]
})
export class NoticesRoutingModule {
}
