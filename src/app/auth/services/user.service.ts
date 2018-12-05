import { Injectable } from '@angular/core';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs';

import { UserDetail } from '../user';

@Injectable()
export class UserService {

  USERS: string = 'users';
  USERS_WITH_SLASH: string = 'users/';

  constructor(private angularFireDB: AngularFireDatabase) {
  }

  createUserDetail(userDetail: UserDetail) {
    this.angularFireDB.database.ref(this.USERS_WITH_SLASH + userDetail.userId).set(userDetail);
  }

  getUserDetail(userId: string): Observable<UserDetail> {
    return this.angularFireDB.object<UserDetail>(this.USERS_WITH_SLASH + userId).valueChanges();
  }

  getUserList(): Observable<Array<UserDetail>> {
    return this.angularFireDB.list<UserDetail>(this.USERS).valueChanges();
  }
}
