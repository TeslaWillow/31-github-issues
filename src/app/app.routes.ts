import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'issues',
    loadComponent: () => import('./modules/issues/pages/issue-list/issue-list-page.component').then(m => m.default)
  },
  {
    path: 'issue/:number',
    loadComponent: () => import('./modules/issues/pages/issue/issue-page.component').then(m => m.default)
  },
  {
    path: '**',
    redirectTo: 'issues',
  }
];
