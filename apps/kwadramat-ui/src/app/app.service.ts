import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  private _isLoading$ = new BehaviorSubject(false);
  readonly isLoading$ = this._isLoading$.asObservable();

  startLoading() {
    this._isLoading$.next(true);
  }

  finishLoading() {
    this._isLoading$.next(false);
  }
}
