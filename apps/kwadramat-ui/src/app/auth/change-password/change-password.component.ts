import { CommonModule } from '@angular/common';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, switchMap, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { ButtonPrimaryDirective } from '../../lib/button/button.directive';
import { ButtonLinkDirective } from '../../lib/button/button-link.directive';
import { InputDirective } from '../../lib/input/input.directive';
import { FormErrorBorderDirective } from '../../lib/form-error/form-error-border.directive';
import { FormErrorDirective } from '../../lib/form-error/form-error-message.directive';

const checkPasswords: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  let pass = group.get('newPassword')?.value;
  let confirmPass = group.get('repeatPassword')?.value;

  return pass === confirmPass ? null : { notSame: true };
};

@Component({
  selector: 'sc-auth-change-password',
  templateUrl: './change-password.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonPrimaryDirective,
    ButtonLinkDirective,
    InputDirective,
    FormErrorDirective,
    FormErrorBorderDirective,
  ],
})
export class ChangePasswordComponent {
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  router = inject(Router);

  formGroup = this.fb.group(
    {
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    },
    { validators: checkPasswords }
  );

  submit() {
    this.resetForm();
    this.formGroup.markAllAsTouched();

    const value = this.formGroup.value as {
      currentPassword: string;
      newPassword: string;
      repeatPassword: string;
    };

    if (this.formGroup.invalid || value.newPassword != value.repeatPassword)
      return;

    this.auth
      .whoAmI()
      .pipe(
        switchMap((user) =>
          this.auth.changePassword({ ...value, username: user.username }).pipe(
            tap(() =>
              this.auth.signIn({
                username: user.username,
                password: value.newPassword,
              })
            ),
            tap(() => this.router.navigateByUrl('app/user-profile')),
            catchError((error) => {
              if (
                error instanceof HttpErrorResponse &&
                error.status === HttpStatusCode.Unauthorized
              ) {
                this.formGroup.setErrors({ wrongCredentials: true });
              }
              throw error;
            })
          )
        )
      )
      .subscribe();
  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm() {
    this.formGroup.setErrors(null);
  }

  constructor() {}
}
