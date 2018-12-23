import { Component, OnInit } from '@angular/core';

import { HomeService } from './home.service';
import { AuthService } from '../auth/services/auth.service';

import { NoticeHome } from '../notices/notices.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  notices: NoticeHome[] = [];

  constructor(private homeService: HomeService, private authService: AuthService) {
    this.homeService.getNoticeListForUser(this.authService.user.uid).subscribe(result => {
      this.notices = result;
    })
  }

  ngOnInit() {
  }

}
