import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { TinymceModule } from 'angular2-tinymce';

import { SharedModule } from '../shared/shared.module';
import { NoticesRoutingModule } from './notices.routing.module';

import { CreateNoticeComponent } from './create-notice/create-notice.component';
import { NoticesListComponent, PreviewNoticeComponent } from './notices-list/notices-list.component';

import { NoticesService } from './notices.service';

@NgModule({
  declarations: [
    CreateNoticeComponent,
    NoticesListComponent,
    PreviewNoticeComponent
  ],
  imports: [
    SharedModule,
    NoticesRoutingModule,
    TinymceModule.withConfig({
      skin_url: '/assets/tinymce/skins/lightgray',
      language_url: '/assets/tinymce/i18n/pl.js',
      language: 'pl',
      auto_focus: false}),
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [
    NoticesService
  ],
  entryComponents: [
    PreviewNoticeComponent
  ]
})
export class NoticesModule { }
