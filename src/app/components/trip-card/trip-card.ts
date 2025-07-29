import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  groupDiscount?: number;
}

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCardComponent {
  @Input() trip!: Trip;
  @Output() bookTrip = new EventEmitter<Trip>();

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStarArray(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  onBookTrip() {
    this.bookTrip.emit(this.trip);
  }
}

