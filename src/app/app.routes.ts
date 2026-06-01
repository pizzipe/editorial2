import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Article } from './pages/article/article';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'article', component: Article },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '/home' } // Wildcard route for a 404 page
];
