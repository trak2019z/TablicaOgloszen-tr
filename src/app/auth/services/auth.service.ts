import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { UserDetail } from '../user';

import { Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {

  user: User;
  private userDetail = new Subject<UserDetail>();

  isAdmin: Observable<boolean>;

  constructor(private angularFire: AngularFireAuth,
              private router: Router,
              private userService: UserService) {
    this.angularFire.authState.subscribe(user => {
      this.user = user;
      if (user) this.updateUserDetail();
    });
    this.isAdmin = this.angularFire.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.userService.isAdmin(user.uid)
        } else {
          return of(null);
        }
      })
    )
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

  isLoggedIn(): Observable<boolean> | boolean{
    if (this.angularFire.auth.currentUser) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  isLoggedOut(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.angularFire.authState.subscribe(auth => {
        if (!auth) {
          observer.next(true);
        } else {
          observer.next(false);
          this.router.navigate(['/home']);
        }
      });
    });
  }

  isLoggedAdmin(): Observable<boolean> {
    return this.userService.isAdmin(this.user.uid).pipe(switchMap(result => {
      if (result) {
        return of(true);
      } else {
        return of(false);
      }
    }))
  }

  private updateUserDetail(): void {
    this.isAdmin = this.userService.isAdmin(this.user.uid);
    this.userService.getUserDetail(this.user.uid.toString()).subscribe(userDetail => {
      this.userDetail.next(userDetail);
    });
  }

}
