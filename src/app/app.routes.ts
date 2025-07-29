import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { TripsComponent } from './pages/trips/trips';
import { TripDetailComponent } from './pages/trip-detail/trip-detail';
import { AboutComponent } from './pages/about/about';
import { ContactComponent } from './pages/contact/contact';
import { BlogComponent } from './pages/blog/blog';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'trips', component: TripsComponent },
  { path: 'trips/:id', component: TripDetailComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'blog', component: BlogComponent },
  { path: '**', redirectTo: '/home' } // Wildcard route for 404 page
];

