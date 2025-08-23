import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {
  email = '';
  loading = false;
  status = '';

  private WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwyNBnMN05KDutuvyOJwf1QIqzDyVeOultioGAb9GzuOHBru9lAQ6CezHzkdka4k4QN/exec';


  async subscribe() {
    const em = (this.email || '').trim();

    if (!this.isValidEmail(em)) {
      this.status = 'Please enter a valid email address.';
      return;
    }

    this.loading = true;
    this.status = '';

    try {
      // Send as form-encoded to keep it a "simple request"
      // Use no-cors to avoid CORS preflight on localhost
      const body = new URLSearchParams({ email: em });

      await fetch(this.WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors', // avoids CORS issues on localhost & prod
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      });

      // In no-cors we can't read the response; optimistically confirm
      this.status = '🙌 Thank you for subscribing!';
      this.email = '';
    } catch (err) {
      console.error(err);
      this.status = 'Opps Subscription failed. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  private isValidEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }
 scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  }


}

