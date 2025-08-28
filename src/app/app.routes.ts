import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { UserDetail } from './components/user-detail/user-detail';

export const routes: Routes = [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'users/:id', component: UserDetail }
];

