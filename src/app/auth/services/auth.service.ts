import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { UserService } from './user.service';
import { UserDetail } from '../user';

@Injectable()
export class AuthService {

  user: User;
  private userDetail = new Subject<UserDetail>();

  constructor(private angularFire: AngularFireAuth,
              private router: Router,
              private userService: UserService) {
    this.angularFire.authState.subscribe(user => {
      this.user = user;
      if (user) this.updateUserDetail();
    });
  }

  signUp(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.angularFire.auth.createUserWithEmailAndPassword(email, password);
  }

  logIn(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.angularFire.auth.signInWithEmailAndPassword(email, password);
  }

  logOut(): void {
    this.angularFire.auth.signOut().then(() => {
      this.userDetail.next(null);
      this.router.navigate(['/login'])
    });
  }

  getUserDetailObservable(): Observable<UserDetail> {
    return this.userDetail.asObservable();
  }

  isLoggedIn(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      if (this.user) {
        observer.next(true);
      } else {
        setTimeout(() => {
          if (this.user) {
            observer.next(true);
          } else {
            observer.next(false);
            this.router.navigate(['/login']);
          }
          observer.complete();
        }, 500);
      }
    });
  }

  isLoggedOut(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      if (this.user) {
        observer.next(false);
        this.router.navigate(['/home']);
      } else {
        setTimeout(() => {
          if (this.user) {
            observer.next(false);
            this.router.navigate(['/home']);
          } else {
            observer.next(true);
          }
          observer.complete();
        }, 500);
      }
    });
  }

  private updateUserDetail(): void {
    this.userService.getUserDetail(this.user.uid.toString()).subscribe(userDetail => {
      console.log(userDetail);
      this.userDetail.next(userDetail);
    });
  }

}
