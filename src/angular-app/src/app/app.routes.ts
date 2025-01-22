import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/routes').then(m => m.routes) },
  {
    path: 'bookmarks-manager',
    loadChildren: () => import('./modules/bookmarks-manager/routes').then(m => m.routes)
  },
];
