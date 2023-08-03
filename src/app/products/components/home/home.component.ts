import { Component } from '@angular/core';

import { User } from 'App/auth/models';
import { AuthService } from 'App/auth/services';
import { Role } from 'App/core/enums';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  user: User | null;

  constructor(private authService: AuthService) {
    this.user = this.authService.userValue;
  }

  /**
   * Check if the current logged in user is admin or not.
   */
  get isAdmin() {
    return this.user && this.user.role === Role.ADMIN;
  }
}
