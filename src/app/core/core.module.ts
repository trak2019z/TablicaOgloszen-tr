import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { FooterComponent, NavComponent, PageNotFoundComponent, ConfirmationDialogComponent } from './index';

import { TransformUsernamePipe } from './username.pipe';
import { CoreService } from './core.service';

@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    PageNotFoundComponent,
    TransformUsernamePipe,
    ConfirmationDialogComponent
  ],
  imports: [
    RouterModule,
    SharedModule
  ],
  providers: [
    CoreService
  ],
  exports: [
    NavComponent,
    FooterComponent,
    PageNotFoundComponent
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class CoreModule {}
