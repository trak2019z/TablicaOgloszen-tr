import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { UserService } from '../auth/services/user.service';
import { Group, GroupUser } from './group.interface';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  addUserToGroup(userId: string, role: string, groupId: string): Promise<Group> {
    const additionDate: string = new Date().toLocaleString();
    let groupUser: GroupUser = {
      userId: userId,
      role: role,
      additionDate: additionDate
    };
    this.angularFireDB.database.ref('users/' + userId + '/groups/' + groupId)
      .set(this.prepareUserGroup(groupId, role, additionDate));
    return this.angularFireDB.database.ref('groups/' + groupId + '/users/' + userId)
      .set(groupUser);
  }

  getGroupUsers(groupId: string): Observable<GroupUser[]> {
    return this.angularFireDB.list<GroupUser>(this.GROUPS_WITH_SLASH + groupId + this.USERS).valueChanges()
      .pipe(
        map((groupUsers: GroupUser[]) => {
          return groupUsers.map((groupUser: GroupUser) => {
            this.userService.getUserDetail(groupUser.userId).subscribe(result => groupUser.userDetail = result);
            return groupUser;
          });
        })
      );
  }

  updateGroupUsersList(groupId: string, groupUsers: Array<GroupUser>): void {
    return groupUsers.forEach((groupUser: GroupUser) => {
      groupUser.userDetail = null;
      this.angularFireDB.database.ref('groups/' + groupId + '/users/' + groupUser.userId)
        .set(groupUser);
      this.angularFireDB.database.ref('users/' + groupUser.userId + '/groups/' + groupId)
        .set(this.prepareUserGroup(groupId, groupUser.role, groupUser.additionDate));
    })
  }

  removeUserFromGroup(groupId: string, userId: string): Promise<GroupUser> {
    this.angularFireDB.database.ref('users/' + userId + '/groups/' + groupId).remove();
    return this.angularFireDB.database.ref('groups/' + groupId + '/users/' + userId).remove();
  }

  isUserBelongToGroup(groupId: string, userId: string): Observable<boolean> {
    return this.angularFireDB.object<GroupUser>(this.GROUPS_WITH_SLASH + groupId + this.USERS_WITH_SLASH + userId)
      .valueChanges()
      .pipe(
        map(response => !!response)
      )
  }

  private prepareUserGroup(groupId: string, role: string, additionDate: string) {
    return {
      groupId: groupId,
      role: role,
      additionDate: additionDate
    };
  }

}
