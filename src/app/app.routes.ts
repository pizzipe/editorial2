import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Article } from './pages/article/article';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'article', component: Article },
  { path: '**', redirectTo: '/home' } // Wildcard route for a 404 page
];
