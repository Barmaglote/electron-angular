import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/routes').then(m => m.routes) },
  {
    path: 'bookmarks-manager',
    loadChildren: () => import('./modules/bookmarks-manager/routes').then(m => m.routes)
  },
  {
    path: 'markdown-editor',
    loadChildren: () => import('./modules/markdown-editor/routes').then(m => m.routes)
  },
  {
    path: 'self-test',
    loadChildren: () => import('./modules/self-test/routes').then(m => m.routes)
  },
];
