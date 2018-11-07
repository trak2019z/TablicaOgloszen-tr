import { Injectable } from '@angular/core';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs';

import { UserDetail } from './user';

@Injectable()
export class UserService {

  constructor(private angularFireDB: AngularFireDatabase) {
  }

  createUserDetail(userDetail: UserDetail) {
    this.angularFireDB.database.ref('users/' + userDetail.userId).set(userDetail);
  }

  getUserDetail(userId: string): Observable<UserDetail> {
    return this.angularFireDB.object<UserDetail>(`users/` + userId).valueChanges();
  }
}
