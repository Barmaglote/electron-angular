import { Routes } from '@angular/router';
import { SelfTestRootComponent } from './controllers/self-test-root/self-test-root.component';
export const routes: Routes = [
  {
    path: '',
    data: { headerTitle: 'Self Test Page' },
    component: SelfTestRootComponent,
  },
];
