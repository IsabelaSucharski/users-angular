import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { UserDetail } from './components/user-detail/user-detail';
import { Error } from './components/error/error';

export const routes: Routes = [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'users/:id', component: UserDetail },
      { path: 'error', component: Error }
];

