import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  /**
   * The set of subscriptions on this components,
   * these subscriptions must be unsubscribed before this component got destroyed.
   */
  subscriptions = new Subscription();

  // getter lang
  get language() {
    return localStorage.getItem('language');
  }

  // convenience getter for easy access to form fields
  get formControls() {
    return this.form.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public toastr: ToastrService
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
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form?.invalid) {
      return;
    }

    this.loading = true;
    const { username, password } = this.form.value;

    this.authService.login(username, password).subscribe(
      (res) => {
        this.router.navigate(['/']);
        this.toastr.success('Login success', 'Success');
      },
      (err) => {
        this.toastr.error(err, 'Error');
        this.loading = false;
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
