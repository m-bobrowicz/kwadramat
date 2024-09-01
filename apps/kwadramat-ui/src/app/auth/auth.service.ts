import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable } from 'rxjs';
import { User } from '../user/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  whoAmI(): Observable<User> {
    return this.http.get<User>('/api/auth/who-am-i');
  }

  signIn(data: { username: string; password: string }): Observable<User> {
    return this.http
      .post('/api/auth/sign-in', data)
      .pipe(exhaustMap(() => this.whoAmI()));
  }

  signOut() {
    return this.http.post('/api/auth/sign-out', {});
  }

  changePassword(data: {
    currentPassword: string;
    newPassword: string;
    username: string;
  }) {
    return this.http.post('/api/auth/change-password', data);
  }

  constructor(private http: HttpClient) {}
}
