import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Trip } from '../../components/trip-card/trip-card';

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

interface TripInclusion {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './trip-detail.html',
  styleUrl: './trip-detail.css'
})
export class TripDetailComponent implements OnInit {
  trip: Trip | null = null;
  selectedTab = 'overview';
  
  // Sample comprehensive trip data - in a real app, this would come from a service
  allTrips: { [key: string]: any } = {
    'goa-beach-retreat': {
      trip: {
        id: 'goa-beach-retreat',
        title: 'Goa Beach Retreat',
        description: 'Golden beaches, vibrant nightlife, Portuguese colonial charm, and lively flea markets. Perfect for honeymooners and group trips alike.',
        location: 'Goa, India',
        duration: '4 Days',
        price: 9999,
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop',
        rating: 4.7,
        reviews: 245,
        features: ['Beach', 'Nightlife', 'Culture', 'Cruise'],
        category: 'Beach Getaways',
        groupDiscount: 10
      },
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Goa',
          description: 'Transfer to hotel and leisure time at Baga Beach.',
          activities: ['Airport Transfer', 'Hotel Check-in', 'Baga Beach Visit', 'Welcome Drink']
        },
        {
          day: 2,
          title: 'North Goa Tour',
          description: 'Explore the historic forts and beautiful beaches of North Goa.',
          activities: ['Fort Aguada', 'Calangute Beach', 'Anjuna Beach', 'Chapora Fort']
        },
        {
          day: 3,
          title: 'South Goa Tour',
          description: 'Discover the cultural heritage and scenic beauty of South Goa.',
          activities: ['Miramar Beach', 'Old Goa Churches', 'Mangueshi Temple', 'Sunset Cruise']
        },
        {
          day: 4,
          title: 'Check-out and Departure',
          description: 'Free time for shopping and departure.',
          activities: ['Shopping', 'Check-out', 'Airport Transfer']
        }
      ],
      inclusions: [
        { icon: 'fas fa-hotel', title: '3-star Hotel', description: 'Near Baga Beach with breakfast' },
        { icon: 'fas fa-car', title: 'Private Transfers', description: 'Airport and sightseeing transfers' },
        { icon: 'fas fa-ship', title: 'Sunset Cruise', description: 'Mandovi River cruise with dinner' },
        { icon: 'fas fa-user-tie', title: 'Local Guide', description: 'Experienced local guide for sightseeing' }
      ]
    },
    'dubai-delight': {
      trip: {
        id: 'dubai-delight',
        title: 'Dubai Delight',
        description: 'A luxurious blend of futuristic cityscape, desert adventures, and world-class shopping. Ideal for families, couples, and first-time international travelers.',
        location: 'Dubai, UAE',
        duration: '5 Days',
        price: 45999,
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
        rating: 4.8,
        reviews: 267,
        features: ['Burj Khalifa', 'Desert Safari', 'Dubai Mall', 'Dhow Cruise'],
        category: 'International Tours',
        groupDiscount: 20
      },
      itinerary: [
        {
          day: 1,
          title: 'Arrival and Dhow Cruise',
          description: 'Arrive in Dubai and enjoy a traditional dhow cruise dinner.',
          activities: ['Airport Transfer', 'Hotel Check-in', 'Dhow Cruise Dinner', 'Dubai Marina Walk']
        },
        {
          day: 2,
          title: 'Dubai City Tour',
          description: 'Explore the iconic landmarks of modern Dubai.',
          activities: ['Burj Khalifa 124th Floor', 'Dubai Mall', 'Dubai Aquarium', 'Dubai Fountain Show']
        },
        {
          day: 3,
          title: 'Desert Safari',
          description: 'Experience the thrill of desert adventure.',
          activities: ['Dune Bashing', 'Camel Riding', 'Belly Dance Show', 'BBQ Dinner']
        },
        {
          day: 4,
          title: 'Dubai Frame & Shopping',
          description: 'Visit Dubai Frame and enjoy shopping at world-class malls.',
          activities: ['Dubai Frame', 'Miracle Garden', 'Gold Souk', 'Spice Souk']
        },
        {
          day: 5,
          title: 'Departure',
          description: 'Free time and departure.',
          activities: ['Free Time', 'Last-minute Shopping', 'Airport Transfer']
        }
      ],
      inclusions: [
        { icon: 'fas fa-hotel', title: '4-star Hotel', description: 'Centrally located with breakfast' },
        { icon: 'fas fa-plane', title: 'Flights', description: 'Round-trip flights included' },
        { icon: 'fas fa-car', title: 'All Transfers', description: 'Airport and sightseeing transfers' },
        { icon: 'fas fa-ticket-alt', title: 'Entry Tickets', description: 'All attraction entry tickets included' }
      ]
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Get trip ID from route parameters
    const tripId = this.route.snapshot.paramMap.get('id');
    
    if (tripId && this.allTrips[tripId]) {
      this.trip = this.allTrips[tripId].trip;
    } else {
      // Default fallback trip
      this.trip = {
        id: 'default',
        title: 'Amazing Adventure',
        description: 'Discover incredible destinations and create unforgettable memories.',
        location: 'Various Locations',
        duration: '5 Days',
        price: 15999,
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
        rating: 4.5,
        reviews: 100,
        features: ['Adventure', 'Culture', 'Nature', 'Food'],
        category: 'Adventure Tours'
      };
    }
  }

  getCurrentTripData() {
    if (!this.trip) return null;
    return this.allTrips[this.trip.id] || {
      itinerary: [
        {
          day: 1,
          title: 'Arrival',
          description: 'Arrive at destination and check-in.',
          activities: ['Airport Transfer', 'Hotel Check-in', 'Welcome Briefing']
        },
        {
          day: 2,
          title: 'Exploration',
          description: 'Explore the main attractions.',
          activities: ['Sightseeing', 'Local Cuisine', 'Cultural Activities']
        }
      ],
      inclusions: [
        { icon: 'fas fa-hotel', title: 'Accommodation', description: 'Comfortable hotel stay' },
        { icon: 'fas fa-car', title: 'Transfers', description: 'All necessary transfers' }
      ]
    };
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStarArray(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  openBookingForm() {
    // In a real app, this would open a booking modal or redirect to booking page
    alert('Booking functionality will be implemented. For now, please contact us directly!');
  }

  shareTrip() {
    if (navigator.share) {
      navigator.share({
        title: this.trip?.title,
        text: this.trip?.description,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  }
}

