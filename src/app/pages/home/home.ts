import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TripCardComponent, Trip } from '../../components/trip-card/trip-card';
import { AlertPopupComponent } from '../../components/alert-popup/alert-popup';

interface Testimonial {
  name: string;
  location: string;
  review: string;
  avatar: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, TripCardComponent, AlertPopupComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  showAlert = false;
  
  featuredTrips: Trip[] = [
    {
      id: '1',
      title: 'Magical Bali Adventure',
      description: 'Explore the beautiful temples, pristine beaches, and lush rice terraces of Bali. Experience the rich culture and warm hospitality of the Balinese people.',
      location: 'Bali, Indonesia',
      duration: '7 Days',
      price: 899,
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop',
      rating: 4.8,
      reviews: 124,
      features: ['Temples', 'Beaches', 'Culture', 'Food'],
      groupDiscount: 10
    },
    {
      id: '2',
      title: 'Swiss Alps Hiking Experience',
      description: 'Breathtaking mountain views, crystal-clear lakes, and charming alpine villages await you in this unforgettable Swiss adventure.',
      location: 'Swiss Alps, Switzerland',
      duration: '10 Days',
      price: 1599,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      rating: 4.9,
      reviews: 89,
      features: ['Hiking', 'Mountains', 'Nature', 'Adventure']
    },
    {
      id: '3',
      title: 'Tokyo Cultural Journey',
      description: 'Immerse yourself in the perfect blend of ancient traditions and modern innovation in Japan\'s vibrant capital city.',
      location: 'Tokyo, Japan',
      duration: '5 Days',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
      rating: 4.7,
      reviews: 156,
      features: ['Culture', 'Food', 'Technology', 'History'],
      groupDiscount: 15
    }
  ];

  testimonials: Testimonial[] = [
    {
      name: 'Sarah Johnson',
      location: 'New York, USA',
      review: 'The Bali trip was absolutely incredible! Every detail was perfectly planned, and our guide was amazing. I can\'t wait to book my next adventure with GlobalEaseTrip.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Michael Chen',
      location: 'Toronto, Canada',
      review: 'The Swiss Alps hiking experience exceeded all my expectations. The scenery was breathtaking, and the accommodations were top-notch. Highly recommended!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Emma Rodriguez',
      location: 'Madrid, Spain',
      review: 'Tokyo was a dream come true! The cultural experiences were authentic and the food tours were incredible. Thank you for such an amazing journey!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
  ];

  ngOnInit() {
    // Show alert popup after 3 seconds
    setTimeout(() => {
      this.showAlert = true;
    }, 3000);
  }

  closeAlert() {
    this.showAlert = false;
  }

  claimOffer() {
    // Handle offer claim logic
    console.log('Offer claimed!');
    // Could redirect to trips page with discount applied
  }

  onBookTrip(trip: Trip) {
    // Handle trip booking logic
    console.log('Booking trip:', trip);
    // Could open booking modal or redirect to booking page
  }
}

