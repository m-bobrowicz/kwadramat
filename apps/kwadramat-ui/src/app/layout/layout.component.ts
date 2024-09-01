import { CdkMenu, CdkMenuTrigger } from '@angular/cdk/menu';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FeatherModule } from 'angular-feather';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuDirective } from '../lib/menu/menu.directive';
import { MenuItemDirective } from '../lib/menu/menu-item.directive';

@Component({
  selector: 'sc-layout',
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MenuDirective,
    MenuItemDirective,
    CdkMenuTrigger,
    CdkMenu,
    FeatherModule,
    SidebarComponent,
  ],
})
export class LayoutComponent {
  signOut() {
    this.auth
      .signOut()
      .pipe(tap(() => this.router.navigateByUrl('/auth/sign-in')))
      .subscribe();
  }

  constructor(private auth: AuthService, private router: Router) {}
}
