import { Component, OnInit } from '@angular/core';

import { Role, User } from 'src/app/models';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  user: User | null;

  constructor(private authService: AuthService) {
    this.user = this.authService.userValue;
  }

  ngOnInit() {}

  /**
   * Check if the current logged in user is admin or not.
   */
  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }
}
