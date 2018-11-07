import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserDetail } from '../index';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  isSubmitted: boolean = false;
  isLoggingError: boolean = false;
  errorMessage: string;

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      firstName: new FormControl(null,
        [Validators.required, Validators.maxLength(20)]),
      lastName: new FormControl(null,
        [Validators.required, Validators.maxLength(20)]),
      email: new FormControl(null,
        [Validators.required, Validators.email]),
      password: new FormControl(null,
        [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null)
    }, {
      validators: this.confirmPasswordValidator
    });
  }

  onSignUp(): void {
    this.isSubmitted = true;
    if (this.signUpForm.valid) {
      this.authService.signUp(this.signUpForm.value.email, this.signUpForm.value.password)
        .then(user => {
          this.userService.createUserDetail(this.prepareUserDetail(user.user.uid.toString()));
          this.router.navigate(['/home']);
        }).catch(error => {
        this.isLoggingError = true;
        this.errorMessage = error.toString();
      });
    }
  }

  private confirmPasswordValidator(formGroup: FormGroup): ValidationErrors {
    let password = formGroup.value.password;
    let confirmPassword = formGroup.value.confirmPassword;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword').setErrors({notSame: true});
    }
    return null;
  }

  private prepareUserDetail(uid: string): UserDetail {
    return {
      firstName: this.signUpForm.value.firstName,
      lastName: this.signUpForm.value.lastName,
      isAdmin: false,
      email: this.signUpForm.value.email,
      userId: uid
    };
  }
}
