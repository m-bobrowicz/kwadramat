import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { catchError, finalize, map, of } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  canActivate() {
    this.appService.startLoading();
    return this.http.get('/api/auth/who-am-i').pipe(
      map(() => true),
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === HttpStatusCode.Unauthorized
        ) {
          return of(this.router.parseUrl('/auth/sign-in'));
        }
        throw error;
      }),
      finalize(() => {
        this.appService.finishLoading();
      })
    );
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private appService: AppService
  ) {}
}
