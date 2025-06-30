import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '', 
    loadComponent: () =>
      import('./features/page/home/home-component/home-component')
        .then(m => m.HomeComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/page/profile/profile-component/profile-component')
        .then(m => m.ProfileComponent),
  },
];
