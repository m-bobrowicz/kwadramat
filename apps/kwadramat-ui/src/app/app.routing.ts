import { Route } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Route[] = [
  {
    path: 'admin',
    loadComponent: () =>
      import('./layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: 'user-profile',
        loadComponent: () =>
          import('./user-profile/user-profile.component').then(
            (m) => m.UserProfileComponent
          ),
      },
      {
        path: 'change-password',
        loadComponent: () =>
          import('./auth/change-password/change-password.component').then(
            (m) => m.ChangePasswordComponent
          ),
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.routes),
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./welcome/welcome.component').then((m) => m.WelcomeComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
