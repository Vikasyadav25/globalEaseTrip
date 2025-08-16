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
    // Beach Getaways
    {
      id: 'goa-beach-retreat',
      title: 'Goa Beach Retreat',
      description: 'Golden beaches, vibrant nightlife, Portuguese colonial charm, and lively flea markets. Perfect for honeymooners and group trips alike.',
      location: 'Goa, India',
      duration: '4 Days',
      price: 9999,
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop',
      rating: 4.7,
      reviews: 245,
      features: ['Beach', 'Nightlife', 'Culture', 'Cruise'],
      category: 'Beach Getaways',
      groupDiscount: 10
    },
    {
      id: 'andaman-paradise',
      title: 'Andaman Island Paradise',
      description: 'Pristine turquoise waters, coral reefs, exotic marine life and white sandy beaches. A diver\'s paradise and a honeymooner\'s dream!',
      location: 'Andaman Islands, India',
      duration: '5 Days',
      price: 18999,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
      rating: 4.8,
      reviews: 189,
      features: ['Scuba Diving', 'Beaches', 'Marine Life', 'Island Hopping'],
      category: 'Beach Getaways'
    },
    {
      id: 'lakshadweep-explorer',
      title: 'Lakshadweep Island Explorer',
      description: 'Offbeat island escape known for crystal clear lagoons, unspoiled coral reefs, and relaxed pace. Ideal for digital detox and nature lovers.',
      location: 'Lakshadweep, India',
      duration: '5 Days',
      price: 29999,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
      rating: 4.9,
      reviews: 67,
      features: ['Lagoons', 'Coral Reefs', 'Village Tour', 'Glass Bottom Boat'],
      category: 'Beach Getaways'
    },
    {
      id: 'pondicherry-coastal',
      title: 'Pondicherry Coastal Bliss',
      description: 'A mini France in India! Known for clean beaches, bohemian cafes, yoga retreats, and colorful colonial streets.',
      location: 'Pondicherry, India',
      duration: '3 Days',
      price: 7499,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      rating: 4.5,
      reviews: 156,
      features: ['French Culture', 'Beaches', 'Yoga', 'Colonial Architecture'],
      category: 'Beach Getaways'
    },
    {
      id: 'alleppey-houseboat',
      title: 'Alleppey Houseboat Escape',
      description: 'Experience Kerala\'s famous backwaters on a luxury houseboat. Reconnect with nature as you glide through palm-fringed canals.',
      location: 'Kerala, India',
      duration: '3 Days',
      price: 10500,
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop',
      rating: 4.6,
      reviews: 198,
      features: ['Houseboat', 'Backwaters', 'Local Cuisine', 'Village Visit'],
      category: 'Beach Getaways'
    },

    // Mountain Escapes
    {
      id: 'shimla-manali-delight',
      title: 'Shimla-Manali Himachal Delight',
      description: 'Snowy mountains, apple orchards, colonial charm, and thrilling activities. Ideal for families and honeymooners.',
      location: 'Himachal Pradesh, India',
      duration: '6 Days',
      price: 12999,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      rating: 4.7,
      reviews: 234,
      features: ['Snow Activities', 'Mall Road', 'Rohtang Pass', 'Solang Valley'],
      category: 'Mountain Escapes',
      groupDiscount: 15
    },
    {
      id: 'kashmir-tour',
      title: 'Mesmerizing Kashmir Tour',
      description: 'Experience the "Heaven on Earth" with snow-covered peaks, colorful gardens, and houseboat luxury.',
      location: 'Kashmir, India',
      duration: '5 Days',
      price: 14999,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      rating: 4.8,
      reviews: 167,
      features: ['Dal Lake', 'Shikara Ride', 'Gulmarg', 'Pahalgam'],
      category: 'Mountain Escapes'
    },

    // Heritage & Culture
    {
      id: 'royal-rajasthan',
      title: 'Royal Rajasthan Tour',
      description: 'A perfect blend of vibrant colors, royal palaces, traditional markets, and heritage experiences.',
      location: 'Rajasthan, India',
      duration: '6 Days',
      price: 17499,
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&h=300&fit=crop',
      rating: 4.8,
      reviews: 289,
      features: ['Palaces', 'Forts', 'Cultural Show', 'Local Markets'],
      category: 'Heritage & Culture',
      groupDiscount: 12
    },
    {
      id: 'varanasi-spiritual',
      title: 'Varanasi - Sarnath Spiritual Journey',
      description: 'Dive into India\'s spiritual heart, witness ancient rituals and connect with timeless traditions.',
      location: 'Varanasi, India',
      duration: '3 Days',
      price: 8499,
      image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400&h=300&fit=crop',
      rating: 4.6,
      reviews: 145,
      features: ['Ganga Aarti', 'Temples', 'Boat Ride', 'Spiritual Experience'],
      category: 'Heritage & Culture'
    },
    {
      id: 'golden-triangle',
      title: 'Golden Triangle Classic',
      description: 'India\'s most iconic and popular cultural circuit, ideal for first-time travelers to India.',
      location: 'Delhi-Agra-Jaipur, India',
      duration: '5 Days',
      price: 14499,
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop',
      rating: 4.7,
      reviews: 356,
      features: ['Taj Mahal', 'Red Fort', 'Amber Fort', 'Cultural Heritage'],
      category: 'Heritage & Culture'
    },

    // Family Holidays
    {
      id: 'corbett-nainital',
      title: 'Jim Corbett & Nainital Wildlife Retreat',
      description: 'Perfect blend of wildlife, serene hill station, boating fun, and nature walks—ideal for kids and parents alike.',
      location: 'Uttarakhand, India',
      duration: '4 Days',
      price: 11999,
      image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=400&h=300&fit=crop',
      rating: 4.6,
      reviews: 178,
      features: ['Wildlife Safari', 'Lake Boating', 'Cable Car', 'Nature Walks'],
      category: 'Family Holidays'
    },
    {
      id: 'mysore-ooty',
      title: 'Mysore - Ooty Family Scenic Tour',
      description: 'A mix of royal grandeur and scenic hill beauty with fun activities for every age group.',
      location: 'Karnataka, India',
      duration: '5 Days',
      price: 13499,
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=300&fit=crop',
      rating: 4.5,
      reviews: 134,
      features: ['Palace', 'Toy Train', 'Botanical Gardens', 'Hill Station'],
      category: 'Family Holidays'
    },

    // International Tours
    {
      id: 'dubai-delight',
      title: 'Dubai Delight',
      description: 'A luxurious blend of futuristic cityscape, desert adventures, and world-class shopping. Ideal for families, couples, and first-time international travelers.',
      location: 'Dubai, UAE',
      duration: '5 Days',
      price: 45999,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop',
      rating: 4.8,
      reviews: 267,
      features: ['Burj Khalifa', 'Desert Safari', 'Dubai Mall', 'Dhow Cruise'],
      category: 'International Tours',
      groupDiscount: 20
    },
    {
      id: 'thailand-escape',
      title: 'Thailand Fun Escape',
      description: 'Exotic beaches, Thai street food, temples, and fun nightlife with affordable luxury.',
      location: 'Bangkok-Pattaya, Thailand',
      duration: '6 Days',
      price: 39999,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      rating: 4.7,
      reviews: 198,
      features: ['Coral Island', 'Alcazar Show', 'Safari World', 'Thai Massage'],
      category: 'International Tours'
    },
    {
      id: 'maldives-paradise',
      title: 'Mesmerizing Maldives',
      description: 'Ultimate romantic and luxurious getaway with crystal-clear waters and white sandy beaches.',
      location: 'Maldives',
      duration: '4 Days',
      price: 55999,
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=300&fit=crop',
      rating: 4.9,
      reviews: 145,
      features: ['Luxury Villa', 'Water Sports', 'Candlelight Dinner', 'Spa'],
      category: 'International Tours'
    },

    // Weekend Road Trips
    {
      id: 'jaipur-weekend',
      title: 'Jaipur Weekend Getaway',
      description: 'Just a few hours from Delhi, Jaipur offers royal vibes, street food, and handicrafts for a quick royal escape.',
      location: 'Jaipur, India',
      duration: '2 Days',
      price: 5999,
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&h=300&fit=crop',
      rating: 4.4,
      reviews: 89,
      features: ['Amber Fort', 'Hawa Mahal', 'Local Shopping', 'Street Food'],
      category: 'Weekend Road Trips'
    },
    {
      id: 'rishikesh-adventure',
      title: 'Rishikesh Adventure Trip',
      description: 'Ideal for adventure lovers looking for a quick weekend thrill.',
      location: 'Rishikesh, India',
      duration: '2 Days',
      price: 4499,
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
      rating: 4.5,
      reviews: 123,
      features: ['River Rafting', 'Ganga Aarti', 'Cliff Jumping', 'Camping'],
      category: 'Weekend Road Trips'
    }
  ];

  filteredTrips: Trip[] = [];
  uniqueLocations: string[] = [];
  categories: string[] = ['All', 'Beach Getaways', 'Mountain Escapes', 'Heritage & Culture', 'Family Holidays', 'International Tours', 'Weekend Road Trips'];
  selectedCategory = 'All';

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

    // Category filter
    if (this.selectedCategory && this.selectedCategory !== 'All') {
      filtered = filtered.filter(trip => trip.category === this.selectedCategory);
    }

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
          case '0-10000': return price < 10000;
          case '10000-25000': return price >= 10000 && price <= 25000;
          case '25000-50000': return price >= 25000 && price <= 50000;
          case '50000+': return price >= 50000;
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
    this.selectedCategory = 'All';
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

