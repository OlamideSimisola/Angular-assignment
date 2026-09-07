import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'Posh | Create Beautiful Websites. Effortlessly.',
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    title: 'About | Posh',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact-page').then((m) => m.ContactPage),
    title: 'Contact | Posh',
  },
  { path: '**', redirectTo: '' },
];
