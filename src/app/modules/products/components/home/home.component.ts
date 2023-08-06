import { Component, OnInit } from '@angular/core';

import { Role } from 'App/core/enums';
import { User } from 'App/modules/auth/models';
import { AuthService } from 'App/modules/auth/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  /**
   * User details.
   */
  user: User | null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.getUserDate();
  }

  getUserDate() {
    this.user = this.authService.userValue;
  }

  /**
   * Check if the current logged in user is admin or not.
   */
  get isAdmin() {
    return this.user && this.user.role === Role.ADMIN;
  }
}
