import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, of, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { Role, User } from '../models';

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

    const role = username == 'admin' ? Role.Admin : Role.User;

    localStorage.setItem('user', JSON.stringify({ ...user, role }));
    this.userSubject.next({ ...user, role });
    return of(true);
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
