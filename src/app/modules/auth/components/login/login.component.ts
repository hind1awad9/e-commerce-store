import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '../../services';
import { User } from '../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  /**
   * Login form
   */
  loginForm: FormGroup;

  /**
   * Check form is finish
   */
  isLoading = false;

  /**
   * Check request of login is finish
   */
  isFormSubmitted = false;

  /**
   * Check if form is failed
   */
  error = '';

  /**
   * The set of subscriptions on this components,
   * these subscriptions must be unsubscribed before this component got destroyed.
   */
  subscriptions = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
    // redirect to home if already logged in
    if (this.authService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * convenience getter for easy access to form fields
   */
  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.isFormSubmitted = true;

    // stop here if form is invalid
    if (this.loginForm?.invalid) {
      return;
    }

    this.isLoading = true;
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(
      (user: User) => {
        this.router.navigate(['/']);

        this.toastr.success(
          this.translate.instant('LOGIN.LOGIN_SUCCESS'),
          this.translate.instant('PRODUCT.SUCCESS')
        );
      },
      (err) => {
        this.toastr.error(err, 'Error');
        this.isLoading = false;
      }
    );
  }

  /**
   * Destroy component data
   */
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
