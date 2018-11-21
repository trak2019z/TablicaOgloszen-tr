import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

import { Group } from './group';

@Injectable()
export class GroupsService {

  GROUPS: string = 'groups';
  GROUPS_WITH_SLASH: string = 'groups/';

  constructor(private angularFireDB: AngularFireDatabase) {
  }

  createGroup(group: Group): Promise<Group> {
    let key = this.angularFireDB.database.ref().child(this.GROUPS).push().key;
    group.id= key;
    return this.angularFireDB.database.ref(this.GROUPS_WITH_SLASH + key).set(group);
  }

  updateGroup(group: Group): Promise<Group> {
    console.log(group.id)
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
}
