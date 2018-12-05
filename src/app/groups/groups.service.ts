import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { UserService } from '../auth/services/user.service';
import { Group, GroupUser } from './group.interface';

import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class GroupsService {

  GROUPS: string = 'groups';
  GROUPS_WITH_SLASH: string = 'groups/';
  USERS: string = '/users';
  USERS_WITH_SLASH: string = '/users/';

  constructor(private angularFireDB: AngularFireDatabase, private userService: UserService) {
  }

  createGroup(group: Group): Promise<Group> {
    let key = this.angularFireDB.database.ref().child(this.GROUPS).push().key;
    group.id = key;
    return this.angularFireDB.database.ref(this.GROUPS_WITH_SLASH + key).set(group);
  }

  updateGroup(group: Group): Promise<Group> {
    return this.angularFireDB.database.ref(this.GROUPS_WITH_SLASH + group.id).set(group);
  }

  getGroupList(): Observable<Array<Group>> {
    return this.angularFireDB.list<Group>(this.GROUPS).valueChanges();
  }

  getGroup(id: string): Observable<Group> {
    return this.angularFireDB.object<Group>(this.GROUPS_WITH_SLASH + id).valueChanges();
  }

  removeGroup(id: string): Promise<Group> {
    return this.angularFireDB.database.ref(this.GROUPS_WITH_SLASH + id).remove();
  }

  addUserToGroup(groupUser: GroupUser, group: Group): Promise<Group> {
    return this.angularFireDB.database.ref(this.GROUPS_WITH_SLASH + group.id + this.USERS_WITH_SLASH + groupUser.id).set(groupUser);
  }

  getGroupUsers(groupId: string): Observable<Array<GroupUser>> {
    return this.angularFireDB.list<GroupUser>(this.GROUPS_WITH_SLASH + groupId + this.USERS).valueChanges();
      // .pipe(
      // switchMap((groupUsers: Array<GroupUser>) => {

        // groupUsers.map((groupUser: GroupUser) => {
        //   this.userService.getUserDetail(groupUser.id).subscribe(result => {
        //     groupUser.userDetail = result;
        //   })
        //   console.log(groupUser);
        //   return of(groupUser);
        // })
    //   })
    // );
  }

  updateGroupUsersList(groupId: string, groupUsers: Array<GroupUser>): void {
    return groupUsers.forEach(data => {
      this.angularFireDB.database.ref(this.GROUPS_WITH_SLASH + groupId + this.USERS_WITH_SLASH + data.id).set(data);
    })
  }

  removeUserFromGroup(groupId: string, userId: string): Promise<GroupUser> {
    return this.angularFireDB.database.ref(this.GROUPS_WITH_SLASH + groupId + this.USERS_WITH_SLASH + userId).remove();
  }

  isUserBelongToGroup(groupId: string, userId: string): Observable<boolean> {
    return this.angularFireDB.object<GroupUser>(this.GROUPS_WITH_SLASH + groupId + this.USERS_WITH_SLASH + userId)
      .valueChanges()
      .pipe(
        map(response => !!response)
      )
  }

}
