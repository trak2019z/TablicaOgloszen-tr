import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { UserDetail } from '../../auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  user: UserDetail;

  constructor(private authService: AuthService,
              private router: Router) {
    this.authService.getUserDetailObservable().subscribe(userDetail => {
      console.log(userDetail);
      if (userDetail) this.user = userDetail;
    });
  }

  ngOnInit() {
  }

  onLogOut(): void {
    this.authService.logOut();
  }

}
