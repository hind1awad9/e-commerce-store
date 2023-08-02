import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, of, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { User } from '../models';
import { Role } from 'App/core/enums';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  private readonly users = [
    {
      username: 'user',
      password: 'user',
    },
    {
      username: 'admin',
      password: 'admin',
    },
  ];

  constructor(private httpClient: HttpClient, private router: Router) {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user') || '');
      this.setUserValue(user);
    }
  }

  private setUserValue(user: User) {
    this.userSubject.next(user);
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    const user = this.users.find((user) => user.username === username);

    if (!user)
      return throwError(() => new Error('Invalid username or password'));

    if (user.password !== password)
      return throwError(() => new Error('Invalid username or password'));

    const role = username == 'admin' ? Role.ADMIN : Role.USER;

    const loggedInUser: User = { ...user, role };

    localStorage.setItem('user', JSON.stringify(loggedInUser));

    this.userSubject.next(loggedInUser);

    return of(loggedInUser);
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  getAll() {
    return this.httpClient.get<User[]>(`${environment.fakeStoreApi}/users`);
  }

  getById(id: number) {
    return this.httpClient.get<User>(`${environment.fakeStoreApi}/users/${id}`);
  }
}
