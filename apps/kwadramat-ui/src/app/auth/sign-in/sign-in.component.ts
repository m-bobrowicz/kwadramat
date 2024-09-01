import { CommonModule } from '@angular/common';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { ButtonLinkDirective } from '../../lib/button/button-link.directive';
import { ButtonPrimaryDirective } from '../../lib/button/button.directive';
import { FormErrorBorderDirective } from '../../lib/form-error/form-error-border.directive';
import { FormErrorDirective } from '../../lib/form-error/form-error-message.directive';
import { InputDirective } from '../../lib/input/input.directive';
import { AuthService } from './../auth.service';

@Component({
  selector: 'sc-auth-sign-in',
  templateUrl: './sign-in.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonPrimaryDirective,
    ButtonLinkDirective,
    InputDirective,
    FormErrorBorderDirective,
    FormErrorDirective,
  ],
})
export class SignInComponent {
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  router = inject(Router);

  formGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  submit() {
    this.formGroup.setErrors(null);
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid) {
      return;
    }

    const value = this.formGroup.value as {
      username: string;
      password: string;
    };
    this.auth
      .signIn(value)
      .pipe(
        tap(() => {
          this.router.navigateByUrl('/');
        }),
        catchError((error) => {
          if (
            error instanceof HttpErrorResponse &&
            error.status === HttpStatusCode.Unauthorized
          ) {
            this.formGroup.setErrors(
              { wrongCredentials: true },
              { emitEvent: true }
            );
          }
          throw error;
        })
      )
      .subscribe();
  }
}
