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
  rating: number;
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
        title: 'Family',
        description: 'Perfect for creating memories together',
        image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=500&fit=crop',
        type: 'family'
      },
      {
        title: 'Couples',
        description: 'Romantic escapes for two',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=500&fit=crop',
        type: 'couples'
      },
      {
        title: 'Groups',
        description: 'Adventures with friends',
        image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=400&h=500&fit=crop',
        type: 'groups'
      },
      {
        title: 'Honeymoon',
        description: 'Celebrate your new beginning',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=500&fit=crop',
        type: 'honeymoon'
      },
      {
        title: 'Solo',
        description: 'Discover yourself through travel',
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=500&fit=crop',
        type: 'solo'
      }
    ],
    popular: [
      {
        title: 'Beach',
        description: 'Sun, sand and relaxation',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=500&fit=crop',
        type: 'beach'
      },
      {
        title: 'Mountains',
        description: 'Peaks and valleys await',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
        type: 'mountains'
      },
      {
        title: 'Culture',
        description: 'Rich heritage experiences',
        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=500&fit=crop',
        type: 'culture'
      },
      {
        title: 'Adventure',
        description: 'Thrilling experiences',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=500&fit=crop',
        type: 'adventure'
      },
      {
        title: 'Luxury',
        description: 'Premium travel experiences',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=500&fit=crop',
        type: 'luxury'
      }
    ],
    month: [
      {
        title: 'January',
        description: 'New year, new adventures',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop',
        type: 'january'
      },
      {
        title: 'April',
        description: 'Spring destinations',
        image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=500&fit=crop',
        type: 'april'
      },
      {
        title: 'July',
        description: 'Summer escapes',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
        type: 'july'
      },
      {
        title: 'October',
        description: 'Autumn adventures',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=500&fit=crop',
        type: 'october'
      },
      {
        title: 'December',
        description: 'Holiday celebrations',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=500&fit=crop',
        type: 'december'
      }
    ],
    spotlight: [
      {
        title: 'Trending',
        description: 'What\'s hot right now',
        image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&h=500&fit=crop',
        type: 'trending'
      },
      {
        title: 'New',
        description: 'Latest destinations',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=500&fit=crop',
        type: 'new'
      },
      {
        title: 'Exclusive',
        description: 'Limited time offers',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=500&fit=crop',
        type: 'exclusive'
      },
      {
        title: 'Featured',
        description: 'Editor\'s choice',
        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=500&fit=crop',
        type: 'featured'
      },
      {
        title: 'Special',
        description: 'Unique experiences',
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=500&fit=crop',
        type: 'special'
      }
    ]
  };
  
  featuredTrips: Trip[] = [
    {
      id: 'gokarna-beach-trek-camp',
      title: 'Gokarna Beach Trek & Camp',
      description: 'A blend of spiritual town and serene beaches. Ideal for backpackers and campers looking for peace.',
      location: 'Gokarna, Karnataka',
      duration: '2 Days',
      price: 6499,
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop',
      rating: 4.3,
      reviews: 89,
      features: ['Beach Camping', 'Trekking', 'Bonfire', 'Spiritual'],
      category: 'Beach Getaways'
    },
    {
      id: 'mesmerizing-kashmir-tour',
      title: 'Mesmerizing Kashmir Tour',
      description: 'Experience the "Heaven on Earth" with snow-covered peaks, colorful gardens, and houseboat luxury.',
      location: 'Kashmir, India',
      duration: '5 Days',
      price: 14999,
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.8,
      reviews: 167,
      features: ['Dal Lake', 'Shikara Ride', 'Gulmarg', 'Pahalgam'],
      category: 'Mountain Escapes'
    },
     {
      id: 'varanasi-sarnath-spiritual-journey',
      title: 'Varanasi - Sarnath Spiritual Journey',
      description: 'Dive into India\'s spiritual heart, witness ancient rituals and connect with timeless traditions.',
      location: 'Varanasi, India',
      duration: '3 Days',
      price: 8499,
      image: 'https://images.unsplash.com/photo-1561359313-0639aad49ca6?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.6,
      reviews: 145,
      features: ['Ganga Aarti', 'Temples', 'Boat Ride', 'Spiritual Experience'],
      category: 'Heritage & Culture'
    }
  ];

  testimonials: Testimonial[] = [
    {
      name: 'Shivani Goher',
      location: 'Himachal, India',
      review: 'Our Kerala backwaters trip was absolutely incredible! Every detail was perfectly planned, and the houseboat experience was unforgettable. I can’t wait to book my next journey with GlobalEaseTrip.',
      avatar: 'https://images.unsplash.com/photo-1655395334314-cfef4610b8b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGdpcmwlMjBpbmRpYXxlbnwwfHwwfHx8MA%3D%3D',
      rating: 5
    },
    {
      name: 'Ajay Minhas',
      location: 'Mumbai, India',
      review: 'The Ladakh road trip exceeded all my expectations. The mountain scenery was breathtaking, and the stay at Pangong Lake was top-notch. Highly recommended!',
      avatar: 'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwbWFufGVufDB8fDB8fHww',
      rating: 4
    },
    {
      name: 'Pawneet Kaur',
      location: 'Chandigarh, India',
      review: 'Exploring Jaipur was a dream come true! The forts, palaces, and cultural experiences were authentic, and the Rajasthani food tours were amazing. Thank you for such a memorable journey!',
      avatar: 'https://images.unsplash.com/photo-1624610260210-0597342d0e3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHVuamFiaSUyMGdpcmx8ZW58MHx8MHx8fDA%3D',
      rating: 5
    },
    {
      name: 'Vani Kapoor',
      location: 'Bangalore, India',
      review: 'Our Goa beach holiday was fantastic! From water sports to vibrant nightlife, everything was perfectly organized. GlobalEaseTrip made it a hassle-free and fun-filled vacation.',
      avatar: 'https://images.unsplash.com/photo-1597983073750-16f5ded1321f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHB1bmphYmklMjBnaXJsfGVufDB8fDB8fHww',
      rating: 5
    },
    {
      name: 'Nikhil Yadav',
      location: 'Lucknow, India',
      review: 'The Varanasi spiritual tour was a life-changing experience. Watching the Ganga Aarti at Dashashwamedh Ghat was truly mesmerizing and unforgettable.',
      avatar: 'https://plus.unsplash.com/premium_photo-1739384032871-e46f0502de82?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym95JTIwaW5kaWF8ZW58MHx8MHx8fDA%3D',
      rating: 5
    },
    {
      name: 'Sneha Reddy',
      location: 'Hyderabad, India',
      review: 'Our trip to Rishikesh was full of adventure! From river rafting to peaceful yoga sessions on the Ganga banks, everything was beyond expectations.',
      avatar: 'https://images.unsplash.com/photo-1721593444611-21e2c1997312?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGdpcmwlMjBpbmRpYSUyMHB1bmphYml8ZW58MHx8MHx8fDA%3D',
      rating: 4
    },
    {
      name: 'Arjun Singh',
      location: 'Amritsar, India',
      review: 'Visiting Himachal was an amazing experience! The snowy peaks of Manali and the serenity of Dharamshala made it one of my best holidays ever.',
      avatar: 'https://images.unsplash.com/photo-1729157661483-ed21901ed892?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGluZGlhbiUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D',
      rating: 5
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

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

