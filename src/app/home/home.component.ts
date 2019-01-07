import {Component, OnDestroy, OnInit} from '@angular/core';

import {HomeService} from './home.service';
import {AuthService} from '../auth/services/auth.service';

import {NoticeHome} from '../notices/notices.interface';

import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  notices: Array<NoticeHome> = [];

  private noticesObs: Subscription;

  constructor(private homeService: HomeService, private authService: AuthService) {
    this.noticesObs = this.homeService.getNoticeListForUser(this.authService.user.uid)
      .pipe(
        map((notices: Array<NoticeHome>) => {
          return notices.reverse();
        })
      )
      .subscribe((notices: Array<NoticeHome>) => {
        this.notices = notices;
      });
  }

  ngOnDestroy(): void {
    this.noticesObs.unsubscribe();
  }

  ngOnInit() {
  }

}
