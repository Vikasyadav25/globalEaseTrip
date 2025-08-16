import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TripCardComponent, Trip } from '../../components/trip-card/trip-card';
import { AlertPopupComponent } from '../../components/alert-popup/alert-popup';

interface Testimonial {
  name: string;
  location: string;
  review: string;
  avatar: string;
}

interface SearchCriteria {
  destination: string;
  duration: string;
  budget: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, TripCardComponent, AlertPopupComponent, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  showAlert = false;
  selectedJourneyTab = 'traveller';
  
  searchCriteria: SearchCriteria = {
    destination: '',
    duration: '',
    budget: ''
  };

  journeyTabs = [
    { id: 'traveller', label: 'BY TRAVELLER' },
    { id: 'popular', label: 'MOST POPULAR' },
    { id: 'month', label: 'BY MONTH' },
    { id: 'spotlight', label: 'IN THE SPOTLIGHT' }
  ];

  journeyCategories = {
    traveller: [
      {
        title: 'FAMILY',
        description: 'Perfect for creating memories together',
        image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=500&fit=crop',
        type: 'family'
      },
      {
        title: 'COUPLES',
        description: 'Romantic escapes for two',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=500&fit=crop',
        type: 'couples'
      },
      {
        title: 'GROUPS',
        description: 'Adventures with friends',
        image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=400&h=500&fit=crop',
        type: 'groups'
      },
      {
        title: 'HONEYMOON',
        description: 'Celebrate your new beginning',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=500&fit=crop',
        type: 'honeymoon'
      },
      {
        title: 'SOLO',
        description: 'Discover yourself through travel',
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=500&fit=crop',
        type: 'solo'
      }
    ],
    popular: [
      {
        title: 'BEACH',
        description: 'Sun, sand and relaxation',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=500&fit=crop',
        type: 'beach'
      },
      {
        title: 'MOUNTAINS',
        description: 'Peaks and valleys await',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
        type: 'mountains'
      },
      {
        title: 'CULTURE',
        description: 'Rich heritage experiences',
        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=500&fit=crop',
        type: 'culture'
      },
      {
        title: 'ADVENTURE',
        description: 'Thrilling experiences',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=500&fit=crop',
        type: 'adventure'
      },
      {
        title: 'LUXURY',
        description: 'Premium travel experiences',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=500&fit=crop',
        type: 'luxury'
      }
    ],
    month: [
      {
        title: 'JANUARY',
        description: 'New year, new adventures',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop',
        type: 'january'
      },
      {
        title: 'APRIL',
        description: 'Spring destinations',
        image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=500&fit=crop',
        type: 'april'
      },
      {
        title: 'JULY',
        description: 'Summer escapes',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
        type: 'july'
      },
      {
        title: 'OCTOBER',
        description: 'Autumn adventures',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=500&fit=crop',
        type: 'october'
      },
      {
        title: 'DECEMBER',
        description: 'Holiday celebrations',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=500&fit=crop',
        type: 'december'
      }
    ],
    spotlight: [
      {
        title: 'TRENDING',
        description: 'What\'s hot right now',
        image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&h=500&fit=crop',
        type: 'trending'
      },
      {
        title: 'NEW',
        description: 'Latest destinations',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=500&fit=crop',
        type: 'new'
      },
      {
        title: 'EXCLUSIVE',
        description: 'Limited time offers',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=500&fit=crop',
        type: 'exclusive'
      },
      {
        title: 'FEATURED',
        description: 'Editor\'s choice',
        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=500&fit=crop',
        type: 'featured'
      },
      {
        title: 'SPECIAL',
        description: 'Unique experiences',
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=500&fit=crop',
        type: 'special'
      }
    ]
  };
  
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

  constructor(private router: Router) {}

  ngOnInit() {
    // Show alert popup after 3 seconds
    setTimeout(() => {
      this.showAlert = true;
    }, 3000);
  }

  searchTrips() {
    // Navigate to trips page with search parameters
    const queryParams: any = {};
    
    if (this.searchCriteria.destination) {
      queryParams.destination = this.searchCriteria.destination;
    }
    if (this.searchCriteria.duration) {
      queryParams.duration = this.searchCriteria.duration;
    }
    if (this.searchCriteria.budget) {
      queryParams.budget = this.searchCriteria.budget;
    }
    
    this.router.navigate(['/trips'], { queryParams });
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

  getJourneyCategoriesForTab() {
    return this.journeyCategories[this.selectedJourneyTab as keyof typeof this.journeyCategories] || [];
  }

  exploreCategory(categoryType: string) {
    // Navigate to trips page with category filter
    this.router.navigate(['/trips'], { queryParams: { category: categoryType } });
  }
}

