import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // animations: [
  //   trigger(
  //     'loader', [
  //       transition(':enter', [
  //         style({opacity: 0}),
  //         animate('250ms', style({opacity: 1}))
  //       ]),
  //       transition(':leave', [
  //         style({opacity: 1}),
  //         animate('250ms', style({opacity: 0}))
  //       ])
  //     ]
  //   )
  // ]
})
export class AppComponent {

  isLoading: boolean = true;

  constructor(private router: Router, public authService: AuthService) {
    router.events.subscribe((routerEvent: RouterEvent) => {
      this.setLoader(routerEvent);
    });
  }

  setLoader(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.isLoading = true;
    } else if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.isLoading = false;
    }
  }
}






