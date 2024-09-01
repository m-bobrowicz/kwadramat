import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../user/user';

@Component({
  selector: 'sc-user-info',
  templateUrl: './user-info.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent {
  @Input() user: User | null = null;
}
