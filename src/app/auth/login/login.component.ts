import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted: boolean = false;
  isLoggingError: boolean = false;
  errorMessage: string;

  constructor(private authService: AuthService,
              private coreService: CoreService,
              private router: Router) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  onLogIn(): void {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.authService.logIn(this.loginForm.value.email, this.loginForm.value.password)
        .then(() => {
          this.coreService.onSetSuccessMessage('Zalogowano pomyślnie');
          this.router.navigate(['/home']);
        }).catch(error => {
          this.isLoggingError = true;
          this.errorMessage = error.toString();
          this.coreService.onSetErrorMessage('Logowanie się nie powiodło');
      })
    }
  }

}
