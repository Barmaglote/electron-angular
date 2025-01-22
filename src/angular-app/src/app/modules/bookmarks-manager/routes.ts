import { Routes } from '@angular/router';
import { BookmarksManagerRootComponent } from './containers/bookmarks-manager-root/bookmarks-manager-root.component';

export const routes: Routes = [
  {
    path: '',
    data: { headerTitle: 'Bookmarks Manager' },
    component: BookmarksManagerRootComponent,
  },
];
