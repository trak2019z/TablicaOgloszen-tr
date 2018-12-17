import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { UserService } from '../auth/services/user.service';

import { Group, GroupUser } from './group.interface';
import { UserGroup } from '../auth';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GroupsService {

  constructor(private angularFireDB: AngularFireDatabase, private userService: UserService) {
  }

  createGroup(group: Group): Promise<Group> {
    group.id = this.angularFireDB.database.ref().child('groups').push().key;
    return this.angularFireDB.database.ref('groups/' + group.id).set(group);
  }

  updateGroup(group: Group): Promise<Group> {
    return this.angularFireDB.database.ref('groups/' + group.id).set(group);
  }

  getGroupList(): Observable<Array<Group>> {
    return this.angularFireDB.list<Group>('groups').valueChanges();
  }

  getGroup(id: string): Observable<Group> {
    return this.angularFireDB.object<Group>('groups/' + id).valueChanges();
  }

  removeGroup(id: string): Promise<Group> {
    return this.angularFireDB.database.ref('groups/' + id).remove();
  }

  addUserToGroup(userId: string, role: string, groupId: string): Promise<any> {
    const additionDate: string = new Date().toLocaleString();
    let groupUser: GroupUser = {
      userId: userId,
      role: role,
      additionDate: additionDate
    };
    return this.angularFireDB.database.ref('users/' + userId + '/groups/' + groupId)
      .set(this.prepareUserGroup(groupId, role, additionDate))
      .then(() => {
        this.angularFireDB.database.ref('groups/' + groupId + '/users/' + userId)
          .set(groupUser);
      });
  }

  getGroupUsers(groupId: string): Observable<GroupUser[]> {
    return this.angularFireDB.list<GroupUser>('groups/' + groupId + '/users').valueChanges()
      .pipe(
        map((groupUsers: GroupUser[]) => {
          return groupUsers.map((groupUser: GroupUser) => {
            this.userService.getUserDetail(groupUser.userId).subscribe(result => groupUser.userDetail = result);
            return groupUser;
          });
        })
      );
  }

  updateGroupUser(groupId: string, groupUser: GroupUser): Promise<any> {
    return this.angularFireDB.database.ref('groups/' + groupId + '/users/' + groupUser.userId).set(groupUser)
      .then(() => {
          this.angularFireDB.database.ref('users/' + groupUser.userId + '/groups/' + groupId)
            .set(this.prepareUserGroup(groupId, groupUser.role, groupUser.additionDate));
      });
  }

  removeUserFromGroup(groupId: string, userId: string): Promise<GroupUser> {
    this.angularFireDB.database.ref('users/' + userId + '/groups/' + groupId).remove();
    return this.angularFireDB.database.ref('groups/' + groupId + '/users/' + userId).remove();
  }

  isUserBelongToGroup(groupId: string, userId: string): Observable<boolean> {
    return this.angularFireDB.object<GroupUser>('groups/' + groupId + '/users/' + userId)
      .valueChanges()
      .pipe(
        map(response => !!response)
      )
  }

  private prepareUserGroup(groupId: string, role: string, additionDate: string): UserGroup {
    return {
      groupId: groupId,
      role: role,
      additionDate: additionDate
    };
  }

}
