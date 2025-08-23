import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';
import { PartnersMarquee } from './components/partners-marquee/partners-marquee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent,PartnersMarquee],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'globalEaseTrip';
}

