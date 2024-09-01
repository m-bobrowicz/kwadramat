import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { of, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ChangePasswordComponent } from 'src/app/auth/change-password/change-password.component';
import { ChangePasswordModule } from 'src/app/auth/change-password/change-password.module';

describe(ChangePasswordComponent.name, () => {
  let spectator: Spectator<ChangePasswordComponent>;
  const createComponent = createComponentFactory({
    component: ChangePasswordComponent,
    declareComponent: false,
    imports: [ChangePasswordModule],
  });
  let authService: Partial<AuthService>;
  let router: Partial<Router>;

  beforeEach(() => {
    authService = {};
    router = {};
    spectator = createComponent({
      providers: [
        { provide: Router, useValue: router },
        { provide: AuthService, useValue: authService },
      ],
    });
  });

  it('should not call http if form is invalid', () => {
    authService.whoAmI = jest.fn().mockReturnValue(of({ username: '' }));
    authService.changePassword = jest.fn().mockReturnValue(of(null));
    authService.signIn = jest.fn().mockReturnValue(of(null));
    router.navigateByUrl = jest.fn();

    spectator.click('[data-change-password-submit]');

    spectator.typeInElement(
      'currentPassword',
      '[data-change-password-current-input]'
    );
    spectator.typeInElement('newPassword', '[data-change-password-new-input]');
    spectator.typeInElement(
      'thisIsNotTheNewPassword',
      '[data-change-password-confirm-input]'
    );

    spectator.click('[data-change-password-submit]');

    expect(authService.whoAmI).not.toHaveBeenCalled();
    expect(authService.changePassword).not.toHaveBeenCalled();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should call http if form is valid', () => {
    authService.whoAmI = jest.fn().mockReturnValue(of({ username: '' }));
    authService.signIn = jest.fn().mockReturnValue(of(null));
    authService.changePassword = jest.fn().mockReturnValue(of(null));
    router.navigateByUrl = jest.fn();

    spectator.typeInElement(
      'currentPassword',
      '[data-change-password-current-input]'
    );
    spectator.typeInElement('newPassword', '[data-change-password-new-input]');
    spectator.typeInElement(
      'newPassword',
      '[data-change-password-confirm-input]'
    );

    spectator.click('[data-change-password-submit]');

    expect(authService.whoAmI).toHaveBeenCalled();
    expect(authService.changePassword).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalled();
  });

  it('should handle http error correctly', () => {
    authService.whoAmI = jest.fn().mockReturnValue(of({ username: '' }));
    authService.signIn = jest.fn().mockReturnValue(of(null));
    authService.changePassword = jest.fn().mockImplementation(() =>
      throwError(
        () =>
          new HttpErrorResponse({
            error: null,
            status: HttpStatusCode.Unauthorized,
          })
      )
    );
    router.navigateByUrl = jest.fn();

    spectator.typeInElement(
      'currentPassword',
      '[data-change-password-current-input]'
    );
    spectator.typeInElement('newPassword', '[data-change-password-new-input]');
    spectator.typeInElement(
      'newPassword',
      '[data-change-password-confirm-input]'
    );

    spectator.click('[data-change-password-submit]');

    expect(spectator.component.formGroup.errors?.['wrongCredentials']).toEqual(
      true
    );
  });
});
