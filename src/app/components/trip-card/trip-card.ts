import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface Trip {
  id: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  features: string[];
  category?: string;
  groupDiscount?: number;
}

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCardComponent {
  @Input() trip!: Trip;
  @Output() bookTrip = new EventEmitter<Trip>();
  private readonly OWNER_WA = '918938962400';            // <- your WhatsApp number (no +, no spaces)
  private readonly PROD_BASE = 'https://globaleasetrip.com';  // <- your live domain


  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStarArray(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  onBookTrip() {
    this.bookTrip.emit(this.trip);
  }
  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  openBookingForm() {
    if (!this.trip) return;

    const t = this.trip;
    const price = new Intl.NumberFormat('en-IN').format(t.price);
    const link = this.getPublicUrl();

    const msg = [
      `Hi! I'd like to book:`,
      ``,
      `*${t.title}* · _${t.duration}_`,
      `${t.location} • From ₹${price} per person`,
      ``,
      `Please confirm availability and next steps.`,
      ``,
      `— My details —`,
      `Preferred dates: [dd-mm-yyyy] to [dd-mm-yyyy]`,
      `Travellers: Adults __ | Children __`,
      `Pickup city: [Your city]`,
      `Special requests: [optional]`,
      ``,
      `Trip link:`,
      link
    ].join('\n').trim();

    const waUrl = this.buildWhatsAppUrl(msg, this.OWNER_WA);

    // Most reliable redirect for WhatsApp Web
    try {
      window.location.href = waUrl;
    } catch {
      // Fallback if something blocks location change
      const a = document.createElement('a');
      a.href = waUrl;
      a.target = '_blank';
      a.rel = 'noopener';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  }


  private getPublicUrl(): string {
    const u = new URL(window.location.href);
    const isLocal = u.hostname === 'localhost' || u.hostname === '127.0.0.1';
    const isProd = u.hostname === 'globaleasetrip.com' || u.hostname === 'www.globaleasetrip.com';

    if (isLocal) {
      // Mirror current path/query/hash onto prod
      return `https://globaleasetrip.com${u.pathname}${u.search}${u.hash}`;
    }

    if (isProd) {
      // Ensure HTTPS on prod (and strip default :80/:443 if present)
      const hostNoDefaultPort = u.host.replace(/:80$|:443$/, '');
      return `https://${hostNoDefaultPort}${u.pathname}${u.search}${u.hash}`;
    }

    // Any other host: prefer HTTPS, otherwise keep as-is
    return u.protocol === 'http:'
      ? `https://${u.host}${u.pathname}${u.search}${u.hash}`
      : u.href;
  }

  private buildWhatsAppUrl(text: string, phone?: string): string {
    const url = new URL('https://api.whatsapp.com/send'); // works for Web & Mobile
    if (phone) url.searchParams.set('phone', phone);
    url.searchParams.set('text', text); // auto-encodes; DON'T encodeURIComponent again
    return url.toString();
  }

}

