import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';

import { AuthService } from './auth/services/auth.service';
import { AuthInterceptor } from './auth/services/auth.interceptor';
import { environment } from '../environments/environment.prod';

import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    AuthModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      closeButton: false,
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [
    AuthService,
    AuthInterceptor
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
