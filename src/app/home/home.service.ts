import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

import {UserDetail, UserGroup} from '../auth';
import {NoticeHome} from '../notices/notices.interface';
import {Group} from '../groups/group.interface';

import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import * as moment from 'moment';

@Injectable()
export class HomeService {

  constructor(private angularFireDB: AngularFireDatabase) {
  }

  public getNoticeListForUser(userId: string): Observable<Array<NoticeHome>> {
    return this.angularFireDB.object<UserDetail>('users/' + userId).valueChanges()
      .pipe(
        switchMap((userDetail: UserDetail) => {
          return this.getNoticeList(this.userGroupArrayToStringArray(userDetail.groups));
        })
      );
  }

  private getNoticeList(groups: string[]): Observable<Array<NoticeHome>> {
    return this.angularFireDB.list<NoticeHome>('notices', this.orderByCreationDate)
      .valueChanges()
      .pipe(
        map(this.filterByExpirationDate),
        map(notices => this.filterNoticesByGroups(notices, groups)),
        map((notices: NoticeHome[]) => {
          return notices.map((notice: NoticeHome) => {
            this.angularFireDB.object<UserDetail>('users/' + notice.userId).valueChanges()
              .subscribe(userDetail => {
                notice.authoFirstName = userDetail.firstName;
                notice.authorLastName = userDetail.lastName;
              });
            if (notice.groupId) {
              this.angularFireDB.object<Group>('groups/' + notice.groupId).valueChanges()
                .subscribe(group => {
                  notice.groupName = group.name;
                });
            }
            return notice;
          });
        })
      );
  }

  private orderByCreationDate(ref) {
    return ref.orderByChild('creationDate');
  }

  private filterNoticesByGroups(notices: Array<NoticeHome>, groups: string[]): Array<NoticeHome> {
    return notices.filter(notice => {
      if (!notice.groupId) {
        return true;
      } else {
        return groups.some((groupId: string) => {
          return groupId === notice.groupId;
        });
      }});
  }

  private userGroupArrayToStringArray(userGroups: Array<UserGroup>): Array<string> {
    let array: Array<string> = [];
    if (userGroups) {
      let resultArray = Object.keys(userGroups).map(function (index) {
        return userGroups[index];
      });
      resultArray.forEach((userGroup: UserGroup) => {
        array.push(userGroup.groupId);
      });
    }
    return array;
  }

  private filterByExpirationDate(notices: Array<NoticeHome>): Array<NoticeHome> {
    return notices.filter((notice: NoticeHome) => {
      if (!notice.expirationDate) {
        return true;
      } else {
        let expirationDate = moment(new Date(notice.expirationDate)).hours(23).minutes(59).seconds(59);
        return moment(new Date()).isBefore(expirationDate);
      }
    });
  }

}
