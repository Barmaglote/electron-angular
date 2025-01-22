import { Routes } from '@angular/router';
import { HomeRootComponent } from './controllers/home-root/home-root.component';
export const routes: Routes = [
  {
    path: '',
    data: { headerTitle: 'Home Page' },
    component: HomeRootComponent,
  },
];
