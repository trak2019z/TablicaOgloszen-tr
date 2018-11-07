import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { FooterComponent, NavComponent, PageNotFoundComponent } from './index';
import { TransformUsernamePipe } from './username.pipe';

@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    PageNotFoundComponent,
    TransformUsernamePipe
  ],
  imports: [
    RouterModule,
    SharedModule
  ],
  providers: [
  ],
  exports: [
    NavComponent,
    FooterComponent,
    PageNotFoundComponent
  ]
})
export class CoreModule {}
