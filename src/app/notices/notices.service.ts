import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Group } from '../groups/group.interface';
import { Notice, NoticeHome } from './notices.interface';
import { UserDetail, UserGroup } from '../auth';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class NoticesService {

  constructor(private angularFireDB: AngularFireDatabase) {
  }

  getNoticeListForEditors(userId: string, isAdmin: boolean): Observable<Array<NoticeHome>> {
    return this.angularFireDB.object<UserDetail>('users/' + userId).valueChanges()
      .pipe(
        map((userDetail: UserDetail) => {
          return userDetail.groups;
        }),
        map(this.filterGroupsWhichUserCanManage),
        switchMap((userGroups: Array<UserGroup>) => {
          return this.getNoticeListForGroups(this.userGroupArrayToStringArray(userGroups), isAdmin, userId);
        })
      );
  }

  createNotice(notice: Notice): Promise<Notice> {
    let key = this.angularFireDB.database.ref().child('notices').push().key;
    notice.id = key;
    return this.angularFireDB.database.ref('notices/' + key).set(notice);
  }

  removeNotice(id: string): Promise<Notice> {
    return this.angularFireDB.database.ref('notices/' + id).remove();
  }

  getGroupList(userId: string): Observable<Array<UserGroup>> {
    return this.angularFireDB.object<UserDetail>('users/' + userId).valueChanges()
      .pipe(
        map((userDetail: UserDetail) => {
          return userDetail.groups;
        }),
        map(this.filterGroupsWhichUserCanManage),
        map((userGroups: UserGroup[]) => {
          let resultArray = Object.keys(userGroups).map(function (index) {
            return userGroups[index];
          });
          return resultArray.map((userGroup: UserGroup) => {
            this.angularFireDB.object<Group>('groups/' + userGroup.groupId).valueChanges().subscribe((group: Group) => {
              userGroup.groupDetial = group;
            });
            return userGroup;
          });
        })
      );
  }

  private getNoticeListForGroups(groups: string[], isAdmin: boolean, userId: string): Observable<Array<NoticeHome>> {
    return this.angularFireDB.list<NoticeHome>('notices', ref => {
      return ref.orderByChild('creationDate');
    }).valueChanges()
      .pipe(
        map((notices: NoticeHome[]) => {
          return notices.filter(notice => {
            if (!notice.groupId) {
              return isAdmin;
            } else {
              return groups.some((groupId: string) => {
                return groupId === notice.groupId;
              });
            }
          });
        }),
        map((notices: NoticeHome[]) => {
          return notices.filter(notice => {
            return notice.userId === userId;
          });
        }),
        map((notices: NoticeHome[]) => {
          return notices.map((notice: NoticeHome) => {
            this.angularFireDB.object<UserDetail>('users/' + notice.userId).valueChanges().subscribe(userDetail => {
              notice.authoFirstName = userDetail.firstName;
              notice.authorLastName = userDetail.lastName;
            });
            if (notice.groupId) {
              this.angularFireDB.object<Group>('groups/' + notice.groupId).valueChanges().subscribe(group => {
                notice.groupName = group.name;
              });
            }
            return notice;
          });
        }),
        map((notices: NoticeHome[]) => {
          return notices.reverse();
        })
      )
  }

  private filterGroupsWhichUserCanManage(userGroups: UserGroup[]): UserGroup[] {
    let resultArray = Object.keys(userGroups).map(function (index) {
      return userGroups[index];
    });
    return resultArray.filter((userGroup: UserGroup) => {
      return userGroup.role !== 'USER';
    });
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
}
