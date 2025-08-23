import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  closeMenu() {
    this.isMobileMenuOpen = false;
  }

  openWhatsApp() {
  console.log('WhatsApp button clicked');
  const phone = '918938962400';
  const message = 'I want to book';
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}
}

