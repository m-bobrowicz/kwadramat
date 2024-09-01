import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserInfoComponent } from './user-info/user-info.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'sc-user-profile',
  templateUrl: './user-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe, UserProfileComponent, UserInfoComponent],
})
export class UserProfileComponent {
  auth = inject(AuthService);
  user$ = this.auth.whoAmI();
}
