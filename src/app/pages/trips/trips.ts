import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TripCardComponent, Trip } from '../../components/trip-card/trip-card';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TripCardComponent],
  templateUrl: './trips.html',
  styleUrl: './trips.css'
})
export class TripsComponent implements OnInit {
  isLoading = true;
  searchTerm = '';
  selectedLocation = '';
  selectedDuration = '';
  selectedPriceRange = '';
  sortBy = 'featured';
  hasMoreTrips = false;

  allTrips: Trip[] = [
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
    },
    {
      id: '4',
      title: 'African Safari Adventure',
      description: 'Witness the Big Five in their natural habitat and experience the raw beauty of the African wilderness.',
      location: 'Kenya & Tanzania',
      duration: '12 Days',
      price: 2299,
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop',
      rating: 4.9,
      reviews: 67,
      features: ['Wildlife', 'Safari', 'Nature', 'Photography']
    },
    {
      id: '5',
      title: 'Iceland Northern Lights',
      description: 'Chase the Aurora Borealis and explore Iceland\'s dramatic landscapes, geysers, and glaciers.',
      location: 'Reykjavik, Iceland',
      duration: '6 Days',
      price: 1799,
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=300&fit=crop',
      rating: 4.6,
      reviews: 92,
      features: ['Northern Lights', 'Glaciers', 'Geysers', 'Adventure']
    },
    {
      id: '6',
      title: 'Machu Picchu Trek',
      description: 'Hike the ancient Inca Trail to the mystical ruins of Machu Picchu, one of the New Seven Wonders of the World.',
      location: 'Cusco, Peru',
      duration: '8 Days',
      price: 1199,
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&h=300&fit=crop',
      rating: 4.8,
      reviews: 134,
      features: ['Hiking', 'History', 'Culture', 'Adventure'],
      groupDiscount: 12
    }
  ];

  filteredTrips: Trip[] = [];
  uniqueLocations: string[] = [];

  ngOnInit() {
    this.loadTrips();
  }

  loadTrips() {
    // Simulate loading
    setTimeout(() => {
      this.filteredTrips = [...this.allTrips];
      this.uniqueLocations = [...new Set(this.allTrips.map(trip => trip.location))];
      this.isLoading = false;
    }, 1000);
  }

  applyFilters() {
    let filtered = [...this.allTrips];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(trip => 
        trip.title.toLowerCase().includes(term) ||
        trip.location.toLowerCase().includes(term) ||
        trip.description.toLowerCase().includes(term) ||
        trip.features.some(feature => feature.toLowerCase().includes(term))
      );
    }

    // Location filter
    if (this.selectedLocation) {
      filtered = filtered.filter(trip => trip.location === this.selectedLocation);
    }

    // Duration filter
    if (this.selectedDuration) {
      filtered = filtered.filter(trip => {
        const days = parseInt(trip.duration);
        switch (this.selectedDuration) {
          case '1-3': return days >= 1 && days <= 3;
          case '4-7': return days >= 4 && days <= 7;
          case '8-14': return days >= 8 && days <= 14;
          case '15+': return days >= 15;
          default: return true;
        }
      });
    }

    // Price filter
    if (this.selectedPriceRange) {
      filtered = filtered.filter(trip => {
        const price = trip.price;
        switch (this.selectedPriceRange) {
          case '0-500': return price < 500;
          case '500-1000': return price >= 500 && price <= 1000;
          case '1000-2000': return price >= 1000 && price <= 2000;
          case '2000+': return price >= 2000;
          default: return true;
        }
      });
    }

    this.filteredTrips = filtered;
    this.applySorting();
  }

  applySorting() {
    switch (this.sortBy) {
      case 'price-low':
        this.filteredTrips.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.filteredTrips.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        this.filteredTrips.sort((a, b) => b.rating - a.rating);
        break;
      case 'duration':
        this.filteredTrips.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
      default:
        // Keep original order for featured
        break;
    }
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedLocation = '';
    this.selectedDuration = '';
    this.selectedPriceRange = '';
    this.sortBy = 'featured';
    this.filteredTrips = [...this.allTrips];
  }

  loadMoreTrips() {
    // Simulate loading more trips
    this.hasMoreTrips = false;
  }

  onBookTrip(trip: Trip) {
    console.log('Booking trip:', trip);
    // Handle booking logic
  }

  trackByTripId(index: number, trip: Trip): string {
    return trip.id;
  }
}

