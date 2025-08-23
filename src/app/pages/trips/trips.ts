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
      id: 'andaman-island-paradise',
      title: 'Andaman Island Paradise',
      description: 'Pristine turquoise waters, coral reefs, exotic marine life and white sandy beaches. A diver\'s paradise and a honeymooner\'s dream!',
      location: 'Andaman Islands, India',
      duration: '5 Days',
      price: 18999,
      image: 'https://images.unsplash.com/photo-1724258319084-334df378dc43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8QW5kYW1hbiUyMElzbGFuZCUyMFBhcmFkaXNlfGVufDB8fDB8fHww',
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
      id: 'pondicherry-coastal-bliss',
      title: 'Pondicherry Coastal Bliss',
      description: 'A mini France in India! Known for clean beaches, bohemian cafes, yoga retreats, and colorful colonial streets.',
      location: 'Pondicherry, India',
      duration: '3 Days',
      price: 7499,
      image: 'https://images.unsplash.com/photo-1664373755199-9c22b902232e?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.5,
      reviews: 156,
      features: ['French Culture', 'Beaches', 'Yoga', 'Colonial Architecture'],
      category: 'Beach Getaways'
    },
    {
      id: 'alleppey-houseboat-escape',
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
    {
      id: 'varkala-cliff-beach-tour',
      title: 'Varkala Cliff & Beach Tour',
      description: 'Wellness meets the sea. A peaceful destination perfect for yoga, meditation and ocean lovers.',
      location: 'Varkala, Kerala',
      duration: '4 Days',
      price: 8999,
      image: 'https://images.unsplash.com/photo-1583679964212-419116d1a830?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.4,
      reviews: 112,
      features: ['Cliff Views', 'Yoga', 'Ayurveda', 'Beach'],
      category: 'Beach Getaways'
    },
    {
      id: 'gokarna-beach-trek-camp',
      title: 'Gokarna Beach Trek & Camp',
      description: 'A blend of spiritual town and serene beaches. Ideal for backpackers and campers looking for peace.',
      location: 'Gokarna, Karnataka',
      duration: '2 Days',
      price: 6499,
      image: 'https://muddietrails.com/wp-content/uploads/2024/01/Gokarna-Om-Beach-2.webp',
      rating: 4.3,
      reviews: 89,
      features: ['Beach Camping', 'Trekking', 'Bonfire', 'Spiritual'],
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
      image: 'https://cdn1.tripoto.com/media/filter/tst/img/1524784/Image/1575550516_shimla_manali.jpg.webp',
      rating: 4.7,
      reviews: 234,
      features: ['Snow Activities', 'Mall Road', 'Rohtang Pass', 'Solang Valley'],
      category: 'Mountain Escapes',
      groupDiscount: 15
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

    // Heritage & Culture
    {
      id: 'royal-rajasthan-tour',
      title: 'Royal Rajasthan Tour',
      description: 'A perfect blend of vibrant colors, royal palaces, traditional markets, and heritage experiences.',
      location: 'Rajasthan, India',
      duration: '6 Days',
      price: 17499,
      image: 'https://images.unsplash.com/photo-1701087366618-112f1b333a9f?q=80&w=1181&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.8,
      reviews: 289,
      features: ['Palaces', 'Forts', 'Cultural Show', 'Local Markets'],
      category: 'Heritage & Culture',
      groupDiscount: 12
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
    },
    {
      id: 'khajuraho-orchha-heritage-escape',
      title: 'Khajuraho & Orchha Heritage Escape',
      description: 'Explore India\'s artistic and architectural gems, preserved over a millennium.',
      location: 'Madhya Pradesh, India',
      duration: '4 Days',
      price: 10999,
      image: 'https://www.tourmyindia.com/packages-tour-india/mp-tours/image/khajuraho-orchha-tour3.webp',
      rating: 4.5,
      reviews: 98,
      features: ['UNESCO Sites', 'Temples', 'Architecture', 'History'],
      category: 'Heritage & Culture'
    },
    {
      id: 'hampi-badami-temple-trail',
      title: 'Hampi & Badami Temple Trail',
      description: 'A surreal landscape of boulders and ancient temple architecture that tells the story of the Vijayanagara empire.',
      location: 'Karnataka, India',
      duration: '5 Days',
      price: 12499,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREsOhGbijiiHmFXq1DEI-WnLwu8Ux_hPFo0A&s',
      rating: 4.6,
      reviews: 134,
      features: ['Ancient Ruins', 'Cave Temples', 'History', 'Architecture'],
      category: 'Heritage & Culture'
    },
    {
      id: 'golden-triangle-classic',
      title: 'Golden Triangle Classic',
      description: 'India\'s most iconic and popular cultural circuit, ideal for first-time travelers to India.',
      location: 'Delhi-Agra-Jaipur, India',
      duration: '5 Days',
      price: 14499,
      image: 'https://images.goway.com/production/split_image_and_text/Taj%20Mahal_Agra_India_iStock-1438303240.jpg',
      rating: 4.7,
      reviews: 356,
      features: ['Taj Mahal', 'Red Fort', 'Amber Fort', 'Cultural Heritage'],
      category: 'Heritage & Culture'
    },

    // Family Holidays
    {
      id: 'jim-corbett-nainital-wildlife-retreat',
      title: 'Jim Corbett & Nainital Wildlife Retreat',
      description: 'Perfect blend of wildlife, serene hill station, boating fun, and nature walks—ideal for kids and parents alike.',
      location: 'Uttarakhand, India',
      duration: '4 Days',
      price: 11999,
      image: 'https://media-cdn.tripadvisor.com/media/photo-s/05/56/db/00/the-corbett-view-resort.jpg',
      rating: 4.6,
      reviews: 178,
      features: ['Wildlife Safari', 'Lake Boating', 'Cable Car', 'Nature Walks'],
      category: 'Family Holidays'
    },
    {
      id: 'mysore-ooty-family-scenic-tour',
      title: 'Mysore - Ooty Family Scenic Tour',
      description: 'A mix of royal grandeur and scenic hill beauty with fun activities for every age group.',
      location: 'Karnataka, India',
      duration: '5 Days',
      price: 13499,
      image: 'https://i1.wp.com/oneday.tours/wp-content/uploads/one-day-mysore-to-ooty-sightseeing-tour-package-private-cab-header.jpg?ssl=1&resize=400%2C200',
      rating: 4.5,
      reviews: 134,
      features: ['Palace', 'Toy Train', 'Botanical Gardens', 'Hill Station'],
      category: 'Family Holidays'
    },
    {
      id: 'sikkim-gangtok-family-escape',
      title: 'Sikkim - Gangtok Family Escape',
      description: 'A peaceful yet adventurous destination with snow lakes, yak rides, and Buddhist monasteries to delight both kids and adults.',
      location: 'Sikkim, India',
      duration: '5 Days',
      price: 16999,
      image: 'https://sikkimcabrental.com/wp-content/uploads/2024/02/DSC_0644-2122163614.jpg',
      rating: 4.7,
      reviews: 156,
      features: ['Cable Car', 'Tsomgo Lake', 'Monasteries', 'Mountain Views'],
      category: 'Family Holidays'
    },
    {
      id: 'andaman-family-beach-holiday',
      title: 'Andaman Family Beach Holiday',
      description: 'Shallow beaches and island hopping experiences that are safe and fun-filled for families with kids.',
      location: 'Andaman Islands, India',
      duration: '5 Days',
      price: 20499,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkBMVqG2VeTNm091KPS8fMh33BZZpIF_r_GQ&s',
      rating: 4.8,
      reviews: 189,
      features: ['Family Beaches', 'Water Sports', 'Island Hopping', 'Safe Activities'],
      category: 'Family Holidays'
    },
    {
      id: 'ramoji-film-city-hyderabad-adventure',
      title: 'Ramoji Film City - Hyderabad Adventure',
      description: 'A creative and cinematic journey where fantasy comes alive—ideal for fun-loving families.',
      location: 'Hyderabad, India',
      duration: '3 Days',
      price: 9499,
      image: 'https://gallery-rfc.s3.ap-south-1.amazonaws.com/packages-rfc/30663Packages.jpg',
      rating: 4.4,
      reviews: 123,
      features: ['Film City', 'Entertainment', 'Snow World', 'Planetarium'],
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
      image: 'https://www.choiceholidaysindia.com/images/dubai_delight_3.jpg',
      rating: 4.8,
      reviews: 267,
      features: ['Burj Khalifa', 'Desert Safari', 'Dubai Mall', 'Dhow Cruise'],
      category: 'International Tours',
      groupDiscount: 20
    },
    {
      id: 'thailand-fun-escape',
      title: 'Thailand Fun Escape',
      description: 'Exotic beaches, Thai street food, temples, and fun nightlife with affordable luxury.',
      location: 'Bangkok-Pattaya, Thailand',
      duration: '6 Days',
      price: 39999,
      image: 'https://images.prismic.io/travelfika/aEpQNrNJEFaPX4r7_PhiPhiIslands.jpg?auto=format,compress',
      rating: 4.7,
      reviews: 198,
      features: ['Coral Island', 'Alcazar Show', 'Safari World', 'Thai Massage'],
      category: 'International Tours'
    },
    {
      id: 'mesmerizing-maldives',
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
    {
      id: 'singapore-family-adventure',
      title: 'Singapore - Family Adventure',
      description: 'A futuristic city-state packed with attractions, eco-wonders, and culinary diversity.',
      location: 'Singapore',
      duration: '5 Days',
      price: 62499,
      image: 'https://ignitetravelsolution.com/wp-content/uploads/2024/01/12-Top-Reasons-to-Visit-Singapore-with-Family-4.jpg',
      rating: 4.8,
      reviews: 234,
      features: ['Universal Studios', 'Gardens by Bay', 'Sentosa', 'Night Safari'],
      category: 'International Tours'
    },
    {
      id: 'europe-highlights',
      title: 'Europe Highlights',
      description: 'A dream tour of romantic Paris, vibrant Amsterdam, and the scenic Swiss Alps all in one unforgettable experience.',
      location: 'Paris-Amsterdam-Switzerland',
      duration: '10 Days',
      price: 189999,
      image: 'https://media.dpauls.com/drive-server/images/packages/france/paris/seine-river-cruise-with-eiffel-tower-paris-france.jpg',
      rating: 4.9,
      reviews: 89,
      features: ['Eiffel Tower', 'Canal Tours', 'Swiss Alps', 'Cultural Sites'],
      category: 'International Tours'
    },

    // Weekend Road Trips
    {
      id: 'jaipur-weekend-getaway',
      title: 'Jaipur Weekend Getaway',
      description: 'Just a few hours from Delhi, Jaipur offers royal vibes, street food, and handicrafts for a quick royal escape.',
      location: 'Jaipur, India',
      duration: '2 Days',
      price: 5999,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQFs-Ds3SLAgeZO5Ne0mPXozH6BWujVoGi7A&s',
      rating: 4.4,
      reviews: 89,
      features: ['Amber Fort', 'Hawa Mahal', 'Local Shopping', 'Street Food'],
      category: 'Weekend Road Trips'
    },
    {
      id: 'rishikesh-adventure-trip',
      title: 'Rishikesh Adventure Trip',
      description: 'Ideal for adventure lovers looking for a quick weekend thrill.',
      location: 'Rishikesh, India',
      duration: '2 Days',
      price: 4499,
      image: 'https://www.lovelytrails.com/admin/image.php?path=privateToursImages%2F16274784070.jpg',
      rating: 4.5,
      reviews: 123,
      features: ['River Rafting', 'Ganga Aarti', 'Cliff Jumping', 'Camping'],
      category: 'Weekend Road Trips'
    },
    {
      id: 'agra-fatehpur-sikri-quick-tour',
      title: 'Agra & Fatehpur Sikri Quick Tour',
      description: 'Witness the timeless beauty of the Taj Mahal and Mughal architectural gems.',
      location: 'Agra, India',
      duration: '2 Days',
      price: 4999,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWxb7RlUTUxiW4Pa-qVPWl7s5zjagdwiOB4w&s',
      rating: 4.6,
      reviews: 167,
      features: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Mughal Heritage'],
      category: 'Weekend Road Trips'
    },
    {
      id: 'mahabaleshwar-nature-drive',
      title: 'Mahabaleshwar Nature Drive',
      description: 'A refreshing hill station getaway with strawberry farms, scenic viewpoints, and pleasant weather.',
      location: 'Mahabaleshwar, Maharashtra',
      duration: '2 Days',
      price: 6499,
      image: 'https://assets.cntraveller.in/photos/60ba1796e341ff812178e57a/16:9/w_1360,h_765,c_limit/Untitled-design-22-1366x768.jpg',
      rating: 4.3,
      reviews: 98,
      features: ['Hill Station', 'Strawberry Farms', 'Viewpoints', 'Nature'],
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

