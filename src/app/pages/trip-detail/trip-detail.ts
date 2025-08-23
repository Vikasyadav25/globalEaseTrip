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
  shareSubject = '';
  shareText = '';
  mailtoUrl = '';
  waUrl = '';

  private readonly OWNER_WA = '918938962400';            // <- your WhatsApp number (no +, no spaces)
  private readonly PROD_BASE = 'https://globaleasetrip.com';  // <- your live domain

  // Comprehensive trip data from the document
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
          description: 'Arrive at Goa airport and transfer to your beachside hotel. Check-in and relax at the beautiful Baga Beach.',
          activities: ['Airport Transfer', 'Hotel Check-in', 'Baga Beach Visit', 'Welcome Drink', 'Beach Walk']
        },
        {
          day: 2,
          title: 'North Goa Exploration',
          description: 'Explore the historic forts and beautiful beaches of North Goa including Fort Aguada and Calangute Beach.',
          activities: ['Fort Aguada', 'Calangute Beach', 'Anjuna Beach', 'Chapora Fort', 'Beach Shacks']
        },
        {
          day: 3,
          title: 'South Goa Cultural Tour',
          description: 'Discover the cultural heritage and scenic beauty of South Goa with church visits and sunset cruise.',
          activities: ['Old Goa Churches', 'Mangueshi Temple', 'Colva Beach', 'Mandovi River Cruise', 'Traditional Dinner']
        },
        {
          day: 4,
          title: 'Leisure and Departure',
          description: 'Free time for shopping at local markets and departure.',
          activities: ['Mapusa Market', 'Souvenir Shopping', 'Beach Time', 'Check-out', 'Airport Transfer']
        }
      ],
      inclusions: [
        { icon: 'fas fa-hotel', title: '3-star Beach Hotel', description: 'AC rooms with breakfast near Baga Beach' },
        { icon: 'fas fa-car', title: 'Private Transfers', description: 'Airport and all sightseeing transfers' },
        { icon: 'fas fa-ship', title: 'Sunset Cruise', description: 'Mandovi River cruise with dinner and entertainment' },
        { icon: 'fas fa-user-tie', title: 'Local Guide', description: 'Experienced local guide for all sightseeing' }
      ]
    },
    'andaman-island-paradise': {
      trip: {
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
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Port Blair',
          description: 'Arrive at Port Blair and visit the historic Cellular Jail.',
          activities: ['Airport Transfer', 'Hotel Check-in', 'Cellular Jail', 'Light & Sound Show']
        },
        {
          day: 2,
          title: 'Havelock Island',
          description: 'Ferry to Havelock Island and enjoy Radhanagar Beach.',
          activities: ['Ferry to Havelock', 'Radhanagar Beach', 'Beach Activities', 'Sunset Viewing']
        },
        {
          day: 3,
          title: 'Scuba Diving Adventure',
          description: 'Experience the underwater world with scuba diving.',
          activities: ['Scuba Diving', 'Elephant Beach', 'Snorkeling', 'Marine Life Exploration']
        },
        {
          day: 4,
          title: 'Neil Island',
          description: 'Visit Neil Island and explore its natural beauty.',
          activities: ['Ferry to Neil Island', 'Bharatpur Beach', 'Natural Bridge', 'Glass Bottom Boat']
        },
        {
          day: 5,
          title: 'Return to Port Blair',
          description: 'Return to Port Blair and departure.',
          activities: ['Ferry to Port Blair', 'Shopping', 'Airport Transfer']
        }
      ],
      inclusions: [
        { icon: 'fas fa-hotel', title: 'Beach Resort', description: 'Sea-facing rooms with all meals' },
        { icon: 'fas fa-ship', title: 'Ferry Transfers', description: 'All inter-island ferry transfers' },
        { icon: 'fas fa-swimming-pool', title: 'Water Sports', description: 'Scuba diving and snorkeling included' },
        { icon: 'fas fa-car', title: 'Local Transfers', description: 'All local transfers and sightseeing' }
      ]
    },
    'shimla-manali-delight': {
      trip: {
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
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Shimla',
          description: 'Arrive in Shimla and explore the famous Mall Road.',
          activities: ['Hotel Check-in', 'Mall Road', 'Christ Church', 'Ridge Walk']
        },
        {
          day: 2,
          title: 'Shimla Sightseeing',
          description: 'Visit Kufri and Jakhoo Temple.',
          activities: ['Kufri', 'Jakhoo Temple', 'Toy Train Ride', 'Local Shopping']
        },
        {
          day: 3,
          title: 'Shimla to Manali',
          description: 'Drive to Manali via scenic mountain roads.',
          activities: ['Scenic Drive', 'Kullu Valley', 'River Rafting', 'Manali Check-in']
        },
        {
          day: 4,
          title: 'Manali Local Sightseeing',
          description: 'Explore Manali town and nearby attractions.',
          activities: ['Hadimba Temple', 'Manu Temple', 'Vashisht Hot Springs', 'Old Manali']
        },
        {
          day: 5,
          title: 'Rohtang Pass Excursion',
          description: 'Visit the famous Rohtang Pass and Solang Valley.',
          activities: ['Rohtang Pass', 'Snow Activities', 'Solang Valley', 'Paragliding']
        },
        {
          day: 6,
          title: 'Departure',
          description: 'Check-out and departure from Manali.',
          activities: ['Shopping', 'Check-out', 'Departure Transfer']
        }
      ],
      inclusions: [
        { icon: 'fas fa-hotel', title: 'Hill Station Hotels', description: 'Comfortable hotels with mountain views' },
        { icon: 'fas fa-car', title: 'Private Vehicle', description: 'AC vehicle for all transfers and sightseeing' },
        { icon: 'fas fa-snowflake', title: 'Snow Activities', description: 'Snow activities at Rohtang Pass' },
        { icon: 'fas fa-utensils', title: 'Meals', description: 'Daily breakfast and dinner included' }
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
        image: 'https://www.choiceholidaysindia.com/images/dubai_delight_3.jpg',
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
          activities: ['Airport Transfer', 'Hotel Check-in', 'Dubai Marina Walk', 'Dhow Cruise Dinner']
        },
        {
          day: 2,
          title: 'Dubai City Tour',
          description: 'Explore the iconic landmarks of modern Dubai.',
          activities: ['Burj Khalifa 124th Floor', 'Dubai Mall', 'Dubai Aquarium', 'Dubai Fountain Show']
        },
        {
          day: 3,
          title: 'Desert Safari Adventure',
          description: 'Experience the thrill of desert adventure.',
          activities: ['Dune Bashing', 'Camel Riding', 'Sandboarding', 'BBQ Dinner with Shows']
        },
        {
          day: 4,
          title: 'Modern Dubai Exploration',
          description: 'Visit Dubai Frame and enjoy world-class shopping.',
          activities: ['Dubai Frame', 'Miracle Garden', 'Gold Souk', 'Spice Souk', 'Dubai Mall Shopping']
        },
        {
          day: 5,
          title: 'Leisure and Departure',
          description: 'Free time for last-minute shopping and departure.',
          activities: ['Free Time', 'Mall of Emirates', 'Souvenir Shopping', 'Airport Transfer']
        }
      ],
      inclusions: [
        { icon: 'fas fa-hotel', title: '4-star Hotel', description: 'Centrally located with daily breakfast' },
        { icon: 'fas fa-plane', title: 'Return Flights', description: 'Round-trip flights from India included' },
        { icon: 'fas fa-car', title: 'All Transfers', description: 'Airport and sightseeing transfers included' },
        { icon: 'fas fa-ticket-alt', title: 'Entry Tickets', description: 'All major attraction tickets included' }
      ]
    },
    'thailand-fun-escape': {
      trip: {
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
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Bangkok',
          description: 'Arrive in Bangkok and city orientation.',
          activities: ['Airport Transfer', 'Hotel Check-in', 'Bangkok City Tour', 'Welcome Dinner']
        },
        {
          day: 2,
          title: 'Bangkok Temples and Safari',
          description: 'Visit famous temples and Safari World.',
          activities: ['Golden Buddha Temple', 'Reclining Buddha', 'Safari World', 'Marine Park']
        },
        {
          day: 3,
          title: 'Bangkok to Pattaya',
          description: 'Transfer to Pattaya and Alcazar Show.',
          activities: ['Transfer to Pattaya', 'Hotel Check-in', 'Alcazar Show', 'Walking Street']
        },
        {
          day: 4,
          title: 'Coral Island Tour',
          description: 'Full day at Coral Island with water sports.',
          activities: ['Coral Island', 'Parasailing', 'Jet Skiing', 'Beach Activities', 'Seafood Lunch']
        },
        {
          day: 5,
          title: 'Pattaya to Bangkok',
          description: 'Return to Bangkok for shopping and relaxation.',
          activities: ['Return to Bangkok', 'MBK Shopping Center', 'Thai Massage', 'Street Food Tour']
        },
        {
          day: 6,
          title: 'Departure',
          description: 'Last-minute shopping and departure.',
          activities: ['Chatuchak Market', 'Souvenir Shopping', 'Airport Transfer']
        }
      ],
      inclusions: [
        { icon: 'fas fa-hotel', title: '3-star Hotels', description: 'Comfortable hotels with breakfast' },
        { icon: 'fas fa-plane', title: 'Return Flights', description: 'Round-trip flights included' },
        { icon: 'fas fa-ship', title: 'Island Tours', description: 'Coral Island tour with lunch' },
        { icon: 'fas fa-ticket-alt', title: 'Show Tickets', description: 'Alcazar Show and Safari World included' }
      ]
    },
    'lakshadweep-explorer': {
      trip: {
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
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Agatti',
          description: 'Arrive at Agatti Airport and transfer to your resort. Relax and enjoy the pristine beaches.',
          activities: ['Airport Transfer', 'Resort Check-in', 'Beach Walk', 'Welcome Drink', 'Sunset Viewing']
        },
        {
          day: 2,
          title: 'Lagoon Exploration',
          description: 'Explore the crystal clear lagoons and enjoy water activities.',
          activities: ['Lagoon Tour', 'Snorkeling', 'Kayaking', 'Glass Bottom Boat Ride', 'Beach Picnic']
        },
        {
          day: 3,
          title: 'Coral Reef Discovery',
          description: 'Discover the unspoiled coral reefs and marine life.',
          activities: ['Coral Reef Tour', 'Scuba Diving', 'Marine Life Photography', 'Island Hopping', 'Local Lunch']
        },
        {
          day: 4,
          title: 'Village Cultural Tour',
          description: 'Experience local culture and traditional island life.',
          activities: ['Village Visit', 'Cultural Show', 'Traditional Fishing', 'Local Handicrafts', 'Coconut Climbing Demo']
        },
        {
          day: 5,
          title: 'Departure',
          description: 'Final relaxation and departure from paradise.',
          activities: ['Beach Time', 'Souvenir Shopping', 'Resort Check-out', 'Airport Transfer']
        }
      ],
      inclusions: [
        { icon: 'fas fa-hotel', title: 'Beach Resort', description: 'Luxury beach resort with all meals included' },
        { icon: 'fas fa-plane', title: 'Flights', description: 'Round-trip flights from Kochi included' },
        { icon: 'fas fa-ship', title: 'Boat Transfers', description: 'All inter-island transfers by boat' },
        { icon: 'fas fa-swimming-pool', title: 'Water Activities', description: 'Snorkeling, kayaking, and glass bottom boat tours' }
      ]
    },
    'pondicherry-coastal-bliss': {
      trip: {
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
      itinerary: [
        {
          day: 1,
          title: 'Arrival & French Quarter',
          description: 'Explore the charming French colonial architecture.',
          activities: ['Hotel Check-in', 'French Quarter Walk', 'Aurobindo Ashram', 'Promenade Beach', 'French Cafes']
        },
        {
          day: 2,
          title: 'Auroville & Beaches',
          description: 'Visit the experimental township and pristine beaches.',
          activities: ['Auroville Visit', 'Matrimandir', 'Paradise Beach', 'Yoga Session', 'Local Markets']
        },
        {
          day: 3,
          title: 'Cultural Exploration',
          description: 'Immerse in local culture and departure.',
          activities: ['Bharathi Park', 'Museum Visit', 'Shopping', 'Beach Time', 'Departure']
        }
      ],
      inclusions: [
        { icon: 'fas fa-hotel', title: 'Heritage Hotel', description: 'Colonial-style heritage accommodation' },
        { icon: 'fas fa-bicycle', title: 'Bike Rental', description: 'Bicycle rental for city exploration' },
        { icon: 'fas fa-ticket-alt', title: 'Entry Fees', description: 'All museum and attraction entry fees' },
        { icon: 'fas fa-coffee', title: 'Cafe Tours', description: 'Guided tours of famous French cafes' }
      ]
    },
    'alleppey-houseboat-escape': {
      trip: {
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
      itinerary: [
        {
          day: 1,
          title: 'Arrival & Houseboat Check-in',
          description: 'Board your luxury houseboat and start the backwater journey.',
          activities: ['Arrival in Alleppey', 'Houseboat Check-in', 'Welcome Drink', 'Backwater Cruise', 'Traditional Lunch']
        },
        {
          day: 2,
          title: 'Backwater Exploration',
          description: 'Explore the serene backwaters and local villages.',
          activities: ['Village Visit', 'Coir Making Demo', 'Fishing Experience', 'Sunset Cruise', 'Cultural Show']
        },
        {
          day: 3,
          title: 'Departure',
          description: 'Final cruise and departure.',
          activities: ['Morning Cruise', 'Bird Watching', 'Houseboat Check-out', 'Local Market Visit', 'Departure']
        }
      ],
      inclusions: [
        { icon: 'fas fa-ship', title: 'Luxury Houseboat', description: 'AC houseboat with all meals included' },
        { icon: 'fas fa-utensils', title: 'Kerala Cuisine', description: 'Authentic Kerala meals prepared onboard' },
        { icon: 'fas fa-user-tie', title: 'Crew Service', description: 'Dedicated crew for personalized service' },
        { icon: 'fas fa-camera', title: 'Village Tours', description: 'Guided village and cultural tours' }
      ]
    },
    'varkala-cliff-beach-tour': {
      trip: {
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
      itinerary: [
        {
          day: 1,
          title: 'Arrival & Cliff Exploration',
          description: 'Arrive and explore the famous Varkala cliffs.',
          activities: ['Hotel Check-in', 'Varkala Cliff Walk', 'Beach Time', 'Sunset Viewing', 'Cliff-top Dining']
        },
        {
          day: 2,
          title: 'Wellness & Yoga',
          description: 'Focus on wellness with yoga and Ayurveda.',
          activities: ['Morning Yoga', 'Ayurvedic Massage', 'Meditation Session', 'Beach Relaxation', 'Wellness Consultation']
        },
        {
          day: 3,
          title: 'Cultural & Spiritual',
          description: 'Explore local temples and spiritual sites.',
          activities: ['Janardhana Temple', 'Sivagiri Mutt', 'Local Market', 'Cultural Show', 'Beach Activities']
        },
        {
          day: 4,
          title: 'Departure',
          description: 'Final relaxation and departure.',
          activities: ['Morning Beach Walk', 'Souvenir Shopping', 'Final Yoga Session', 'Hotel Check-out', 'Departure']
        }
      ],
      inclusions: [
        { icon: 'fas fa-hotel', title: 'Cliff Resort', description: 'Cliff-top resort with ocean views' },
        { icon: 'fas fa-spa', title: 'Wellness Package', description: 'Yoga sessions and Ayurvedic treatments' },
        { icon: 'fas fa-utensils', title: 'Healthy Meals', description: 'Organic and healthy meal options' },
        { icon: 'fas fa-ticket-alt', title: 'Temple Visits', description: 'Guided visits to spiritual sites' }
      ]
    },
    'golden-triangle-classic': {
      trip: {
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
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Delhi',
          description: 'Arrive in Delhi and explore Old and New Delhi.',
          activities: ['Airport Transfer', 'Red Fort', 'Jama Masjid', 'India Gate', 'Raj Ghat']
        },
        {
          day: 2,
          title: 'Delhi to Agra',
          description: 'Drive to Agra and visit the magnificent Taj Mahal.',
          activities: ['Drive to Agra', 'Taj Mahal', 'Agra Fort', 'Mehtab Bagh', 'Sunset at Taj']
        },
        {
          day: 3,
          title: 'Agra to Jaipur',
          description: 'Drive to Jaipur via Fatehpur Sikri.',
          activities: ['Fatehpur Sikri', 'Drive to Jaipur', 'Hotel Check-in', 'Local Market Visit']
        },
        {
          day: 4,
          title: 'Jaipur Sightseeing',
          description: 'Explore the Pink City of Jaipur.',
          activities: ['Amber Fort', 'City Palace', 'Hawa Mahal', 'Jantar Mantar', 'Local Shopping']
        },
        {
          day: 5,
          title: 'Jaipur to Delhi Departure',
          description: 'Return to Delhi and departure.',
          activities: ['Drive to Delhi', 'Last-minute Shopping', 'Airport Transfer']
        }
      ],
      inclusions: [
        { icon: 'fas fa-hotel', title: 'Heritage Hotels', description: '3-star heritage hotels with breakfast' },
        { icon: 'fas fa-car', title: 'AC Vehicle', description: 'Private AC vehicle for all transfers' },
        { icon: 'fas fa-ticket-alt', title: 'Monument Tickets', description: 'All monument entry fees included' },
        { icon: 'fas fa-user-tie', title: 'Expert Guide', description: 'Professional guide at each destination' }
      ]
    },
    'gokarna-beach-trek-camp': {
      trip: {
        id: 'gokarna-beach-trek-camp',
        title: 'Gokarna Beach Trek & Camp',
        description: 'A blend of spiritual town and serene beaches. Ideal for backpackers and campers looking for peace.',
        location: 'Gokarna, India',
        duration: '2 Days / 1 Night',
        price: 6499,
        image: 'https://muddietrails.com/wp-content/uploads/2024/01/Gokarna-Om-Beach-2.webp',
        rating: 4.5,
        reviews: 120,
        features: ['Beach', 'Trekking', 'Camping', 'Spiritual'],
        category: 'Beach Getaways',
        groupDiscount: 5
      },
      itinerary: [
        {
          day: 1,
          title: 'Arrival and Beach Camping',
          description: 'Arrive in Gokarna and check into your beach camp. Enjoy a bonfire in the evening.',
          activities: ['Arrival in Gokarna', 'Beach Camping', 'Bonfire']
        },
        {
          day: 2,
          title: 'Beach Trek and Departure',
          description: 'Embark on a beach trek covering Paradise, Om & Half Moon Beaches. Explore the local area before departure.',
          activities: ['Beach Trek (Paradise, Om & Half Moon Beaches)', 'Local Exploration', 'Departure']
        }
      ],
      inclusions: [
        { icon: 'fas fa-campground', title: 'Beach Camping', description: '1 Night beach camping with bonfire' },
        { icon: 'fas fa-hiking', title: 'Guided Trek', description: 'Guided trek to multiple beaches' },
        { icon: 'fas fa-utensils', title: 'Meals', description: 'Breakfast and Dinner during camping' }
      ]
    },
    'mesmerizing-kashmir-tour': {
      trip: {
        id: 'mesmerizing-kashmir-tour',
        title: 'Mesmerizing Kashmir Tour',
        description: 'Experience the “Heaven on Earth” with snow-covered peaks, colorful gardens, and houseboat luxury.',
        location: 'Kashmir, India',
        duration: '5 Days / 4 Nights',
        price: 14999,
        image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 4.8,
        reviews: 310,
        features: ['Mountains', 'Lakes', 'Culture', 'Houseboat'],
        category: 'Mountain Escapes',
        groupDiscount: 10
      },
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Srinagar',
          description: 'Arrive in Srinagar, check into your houseboat, and enjoy a Shikara ride on Dal Lake. Explore the local bazaar.',
          activities: ['Arrival in Srinagar', 'Houseboat Check-in', 'Shikara Ride on Dal Lake', 'Local Bazaar']
        },
        {
          day: 2,
          title: 'Gulmarg Excursion',
          description: 'Day trip to Gulmarg. Enjoy a Gondola ride and snow activities.',
          activities: ['Day Trip to Gulmarg', 'Gondola Ride', 'Snow Activities']
        },
        {
          day: 3,
          title: 'Pahalgam Valley',
          description: 'Drive to Pahalgam and visit Aru Valley and Betaab Valley.',
          activities: ['Drive to Pahalgam', 'Aru Valley', 'Betaab Valley']
        },
        {
          day: 4,
          title: 'Srinagar Sightseeing',
          description: 'Explore Srinagar with visits to Mughal Gardens and Dal Lake.',
          activities: ['Mughal Gardens', 'Dal Lake']
        },
        {
          day: 5,
          title: 'Departure',
          description: 'Check out from the houseboat and depart from Srinagar.',
          activities: ['Check-out', 'Departure']
        }
      ],
      inclusions: [
        { icon: 'fas fa-houseboat', title: 'Houseboat Stay', description: 'Houseboat stay in Srinagar' },
        { icon: 'fas fa-ship', title: 'Shikara Ride', description: 'Shikara ride on Dal Lake' },
        { icon: 'fas fa-cable-car', title: 'Gulmarg Gondola', description: 'Gulmarg cable car ride' },
        { icon: 'fas fa-car', title: 'Private Transfers', description: 'All transfers and sightseeing' }
      ]
    },
    'royal-rajasthan-tour': {
      trip: {
        id: 'royal-rajasthan-tour',
        title: 'Royal Rajasthan Tour (Jaipur – Jodhpur – Udaipur)',
        description: 'A perfect blend of vibrant colors, royal palaces, traditional markets, and heritage experiences.',
        location: 'Rajasthan, India',
        duration: '6 Days / 5 Nights',
        price: 17499,
        image: 'https://images.unsplash.com/photo-1701087366618-112f1b333a9f?q=80&w=1181&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 4.6,
        reviews: 280,
        features: ['Heritage', 'Culture', 'Palaces', 'Markets'],
        category: 'Heritage & Culture',
        groupDiscount: 10
      },
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Jaipur',
          description: 'Arrive in Jaipur and visit City Palace and Jantar Mantar.',
          activities: ['Arrival in Jaipur', 'City Palace', 'Jantar Mantar']
        },
        {
          day: 2,
          title: 'Jaipur Sightseeing',
          description: 'Explore Amber Fort, Jal Mahal, and enjoy shopping in local bazaars.',
          activities: ['Amber Fort', 'Jal Mahal', 'Local Bazaars']
        },
        {
          day: 3,
          title: 'Transfer to Jodhpur',
          description: 'Transfer to Jodhpur and visit Mehrangarh Fort & Clock Tower Market.',
          activities: ['Transfer to Jodhpur', 'Mehrangarh Fort', 'Clock Tower Market']
        },
        {
          day: 4,
          title: 'Proceed to Udaipur',
          description: 'Proceed to Udaipur and enjoy a leisure evening by Lake Pichola.',
          activities: ['Proceed to Udaipur', 'Lake Pichola']
        },
        {
          day: 5,
          title: 'Udaipur Sightseeing',
          description: 'Explore Udaipur with visits to City Palace, Jagdish Temple, and a boat ride.',
          activities: ['City Palace', 'Jagdish Temple', 'Boat Ride']
        },
        {
          day: 6,
          title: 'Departure',
          description: 'Check out and depart.',
          activities: ['Check-out', 'Departure']
        }
      ],
      inclusions: [
        { icon: 'fas fa-hotel', title: '3-star Hotels', description: 'Accommodation in 3-star hotels' },
        { icon: 'fas fa-car', title: 'Private Transfers', description: 'All transfers and sightseeing' },
        { icon: 'fas fa-fort-awesome', title: 'Fort Entry', description: 'Entry to major forts and palaces' },
        { icon: 'fas fa-ship', title: 'Boat Ride', description: 'Boat ride on Lake Pichola' }
      ]
    },
    'varanasi-sarnath-spiritual-journey': {
      trip: {
        id: 'varanasi-sarnath-spiritual-journey',
        title: 'Varanasi – Sarnath Spiritual Journey',
        description: 'Dive into India’s spiritual heart, witness ancient rituals and connect with timeless traditions.',
        location: 'Varanasi, India',
        duration: '3 Days / 2 Nights',
        price: 8499,
        image: 'https://images.unsplash.com/photo-1561359313-0639aad49ca6?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 4.7,
        reviews: 190,
        features: ['Spiritual', 'Culture', 'Temples', 'River'],
        category: 'Heritage & Culture',
        groupDiscount: 5
      },
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Varanasi',
          description: 'Arrive in Varanasi and witness the evening Ganga Aarti ceremony.',
          activities: ['Arrival in Varanasi', 'Ganga Aarti Ceremony']
        },
        {
          day: 2,
          title: 'Temple Visits and Sarnath',
          description: 'Enjoy an early morning boat ride, visit temples, and an excursion to Sarnath.',
          activities: ['Early Morning Boat Ride', 'Temple Visits', 'Sarnath Excursion']
        },
        {
          day: 3,
          title: 'Shopping and Departure',
          description: 'Enjoy shopping for Banarasi silk before departure.',
          activities: ['Shopping for Banarasi Silk', 'Departure']
        }
      ],
      inclusions: [
        { icon: 'fas fa-hotel', title: 'Accommodation', description: '2 Nights accommodation' },
        { icon: 'fas fa-car', title: 'Private Transfers', description: 'All transfers and sightseeing' },
        { icon: 'fas fa-ship', title: 'Boat Ride', description: 'Boat ride on Ganga River' }
      ]
    },
    'khajuraho-orchha-heritage-escape': {
      trip: {
        id: 'khajuraho-orchha-heritage-escape',
        title: 'Khajuraho & Orchha Heritage Escape',
        description: 'Explore India’s artistic and architectural gems, preserved over a millennium.',
        location: 'Khajuraho & Orchha, India',
        duration: '4 Days / 3 Nights',
        price: 10999,
        image: 'https://www.tourmyindia.com/packages-tour-india/mp-tours/image/khajuraho-orchha-tour3.webp',
        rating: 4.5,
        reviews: 150,
        features: ['Heritage', 'Culture', 'Temples', 'Architecture'],
        category: 'Heritage & Culture',
        groupDiscount: 5
      },
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Khajuraho',
          description: 'Arrive in Khajuraho and enjoy the Light & Sound Show.',
          activities: ['Arrival in Khajuraho', 'Light & Sound Show']
        },
        {
          day: 2,
          title: 'Khajuraho Temples',
          description: 'Enjoy a guided tour of the Khajuraho Temples.',
          activities: ['Guided Tour of Khajuraho Temples']
        },
        {
          day: 3,
          title: 'Drive to Orchha',
          description: 'Drive to Orchha and visit palaces and cenotaphs.',
          activities: ['Drive to Orchha', 'Visit Palaces and Cenotaphs']
        },
        {
          day: 4,
          title: 'Morning Walk and Departure',
          description: 'Enjoy a morning walk along Betwa River before departure.',
          activities: ['Morning Walk along Betwa River', 'Departure']
        }
      ],
      inclusions: [
        { icon: 'fas fa-hotel', title: 'Accommodation', description: '3 Nights accommodation' },
        { icon: 'fas fa-car', title: 'Private Transfers', description: 'All transfers and sightseeing' },
        { icon: 'fas fa-landmark', title: 'Temple Entry', description: 'Entry to major temples and monuments' }
      ]
    },
    'hampi-badami-temple-trail': {
      trip: {
        id: 'hampi-badami-temple-trail',
        title: 'Hampi & Badami Temple Trail',
        description: 'A surreal landscape of boulders and ancient temple architecture that tells the story of the Vijayanagara empire.',
        location: 'Hampi & Badami, India',
        duration: '5 Days / 4 Nights',
        price: 12499,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREsOhGbijiiHmFXq1DEI-WnLwu8Ux_hPFo0A&s',
        rating: 4.6,
        reviews: 170,
        features: ['Heritage', 'Culture', 'Temples', 'Architecture'],
        category: 'Heritage & Culture',
        groupDiscount: 5
      },
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Hampi',
          description: 'Arrive in Hampi and enjoy the sunset viewpoint.',
          activities: ['Arrival in Hampi', 'Sunset Viewpoint']
        },
        {
          day: 2,
          title: 'Hampi Ruins Sightseeing',
          description: 'Full-day sightseeing of Hampi ruins.',
          activities: ['Full-day Sightseeing of Hampi Ruins']
        },
        {
          day: 3,
          title: 'Drive to Badami',
          description: 'Drive to Badami and explore cave temples.',
          activities: ['Drive to Badami', 'Explore Cave Temples']
        },
        {
          day: 4,
          title: 'Aihole & Pattadakal',
          description: 'Visit Aihole & Pattadakal.',
          activities: ['Visit Aihole & Pattadakal']
        },
        {
          day: 5,
          title: 'Departure',
          description: 'Check out and depart.',
          activities: ['Check-out', 'Departure']
        }
      ],
      inclusions: [
        { icon: 'fas fa-hotel', title: 'Accommodation', description: '4 Nights accommodation' },
        { icon: 'fas fa-car', title: 'Private Transfers', description: 'All transfers and sightseeing' },
        { icon: 'fas fa-landmark', title: 'Temple Entry', description: 'Entry to major temples and monuments' }
      ]
    },
    'jim-corbett-nainital-wildlife-retreat': {
      trip: {
        id: 'jim-corbett-nainital-wildlife-retreat',
        title: 'Jim Corbett & Nainital Wildlife Retreat',
        description: 'Perfect blend of wildlife, serene hill station, boating fun, and nature walks—ideal for kids and parents alike.',
        location: 'Jim Corbett & Nainital, India',
        duration: '4 Days / 3 Nights',
        price: 11999,
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/05/56/db/00/the-corbett-view-resort.jpg',
        rating: 4.7,
        reviews: 210,
        features: ['Wildlife', 'Hill Station', 'Nature', 'Family'],
        category: 'Family Holidays',
        groupDiscount: 10
      },
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Corbett',
          description: 'Arrive in Corbett and enjoy an evening jungle safari.',
          activities: ['Arrival in Corbett', 'Evening Jungle Safari']
        },
        {
          day: 2,
          title: 'Drive to Nainital',
          description: 'Drive to Nainital and enjoy a leisure walk on Mall Road.',
          activities: ['Drive to Nainital', 'Mall Road Leisure Walk']
        },
        {
          day: 3,
          title: 'Nainital Sightseeing',
          description: 'Enjoy boating at Naini Lake, visit Naina Devi temple & snow point.',
          activities: ['Boating at Naini Lake', 'Naina Devi Temple', 'Snow Point']
        },
        {
          day: 4,
          title: 'Cable Car Ride and Departure',
          description: 'Enjoy a cable car ride before departure.',
          activities: ['Cable Car Ride', 'Departure']
        }
      ],
      inclusions: [
        { icon: 'fas fa-hotel', title: 'Accommodation', description: '3 Nights accommodation' },
        { icon: 'fas fa-car', title: 'Private Transfers', description: 'All transfers and sightseeing' },
        { icon: 'fas fa-safari', title: 'Jeep Safari', description: 'Jeep safari in Corbett' },
        { icon: 'fas fa-ship', title: 'Boating', description: 'Boating in Naini Lake' }
      ]
    },
    'mysore-ooty-family-scenic-tour': {
      trip: {
        id: 'mysore-ooty-family-scenic-tour',
        title: 'Mysore – Ooty Family Scenic Tour',
        description: 'A mix of royal grandeur and scenic hill beauty with fun activities for every age group.',
        location: 'Mysore & Ooty, India',
        duration: '5 Days / 4 Nights',
        price: 13499,
        image: 'https://i1.wp.com/oneday.tours/wp-content/uploads/one-day-mysore-to-ooty-sightseeing-tour-package-private-cab-header.jpg?ssl=1&resize=400%2C200',
        rating: 4.6,
        reviews: 180,
        features: ['Hill Station', 'Culture', 'Nature', 'Family'],
        category: 'Family Holidays',
        groupDiscount: 10
      },
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Mysore',
          description: 'Arrive in Mysore and visit Mysore Palace.',
          activities: ['Arrival in Mysore', 'Mysore Palace']
        },
        {
          day: 2,
          title: 'Mysore Sightseeing and Transfer to Ooty',
          description: 'Visit Chamundi Hills and Brindavan Gardens. Transfer to Ooty.',
          activities: ['Chamundi Hills', 'Brindavan Gardens', 'Transfer to Ooty']
        },
        {
          day: 3,
          title: 'Ooty Sightseeing',
          description: 'Explore Ooty with visits to Rose Garden and Doddabetta Peak.',
          activities: ['Rose Garden', 'Doddabetta Peak']
        },
        {
          day: 4,
          title: 'Toy Train to Coonoor',
          description: 'Enjoy a Toy Train ride to Coonoor and visit Sim’s Park.',
          activities: ['Toy Train to Coonoor', 'Sim’s Park']
        },
        {
          day: 5,
          title: 'Departure',
          description: 'Check out and depart.',
          activities: ['Check-out', 'Departure']
        }
      ],
      inclusions: [
        { icon: 'fas fa-hotel', title: 'Accommodation', description: '4 Nights accommodation' },
        { icon: 'fas fa-car', title: 'Private Transfers', description: 'All transfers and sightseeing' },
        { icon: 'fas fa-train', title: 'Toy Train Ride', description: 'Ooty Toy Train ride' }
      ]
    },
    'sikkim-gangtok-family-escape': {
      trip: {
        id: 'sikkim-gangtok-family-escape',
        title: 'Sikkim – Gangtok Family Escape',
        description: 'A peaceful yet adventurous destination with snow lakes, yak rides, and Buddhist monasteries to delight both kids and adults.',
        location: 'Sikkim & Gangtok, India',
        duration: '5 Days / 4 Nights',
        price: 16999,
        image: 'https://sikkimcabrental.com/wp-content/uploads/2024/02/DSC_0644-2122163614.jpg',
        rating: 4.8,
        reviews: 230,
        features: ['Mountains', 'Lakes', 'Culture', 'Family'],
        category: 'Family Holidays',
        groupDiscount: 10
      },
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Gangtok',
          description: 'Arrive in Gangtok and enjoy local sightseeing.',
          activities: ['Arrival in Gangtok', 'Local Sightseeing']
        },
        {
          day: 2,
          title: 'Gangtok Sightseeing',
          description: 'Enjoy a cable car ride, visit Enchey Monastery, and leisure time at MG Road.',
          activities: ['Cable Car Ride', 'Enchey Monastery', 'MG Road Leisure']
        },
        {
          day: 3,
          title: 'Tsomgo Lake & Baba Mandir',
          description: 'Excursion to Tsomgo Lake & Baba Mandir.',
          activities: ['Tsomgo Lake', 'Baba Mandir']
        },
        {
          day: 4,
          title: 'Local Markets and Handloom Centre',
          description: 'Visit local markets and Handloom Centre.',
          activities: ['Local Markets', 'Handloom Centre']
        },
        {
          day: 5,
          title: 'Departure',
          description: 'Check out and depart.',
          activities: ['Check-out', 'Departure']
        }
      ],
      inclusions: [
        { icon: 'fas fa-hotel', title: 'Accommodation', description: '4 Nights accommodation' },
        { icon: 'fas fa-car', title: 'Private Transfers', description: 'All transfers and sightseeing' },
        { icon: 'fas fa-cable-car', title: 'Cable Car Ride', description: 'Gangtok cable car ride' }
      ]
    },
    'andaman-family-beach-holiday': {
      trip: {
        id: 'andaman-family-beach-holiday',
        title: 'Andaman Family Beach Holiday',
        description: 'Shallow beaches and island hopping experiences that are safe and fun-filled for families with kids.',
        location: 'Andaman Islands, India',
        duration: '5 Days / 4 Nights',
        price: 20499,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkBMVqG2VeTNm091KPS8fMh33BZZpIF_r_GQ&s',
        rating: 4.7,
        reviews: 260,
        features: ['Beach', 'Family', 'Water Sports', 'Island Hopping'],
        category: 'Family Holidays',
        groupDiscount: 10
      },
      itinerary: [
        {
          day: 1,
          title: 'Port Blair Arrival',
          description: 'Arrive in Port Blair and enjoy the Light & Sound Show.',
          activities: ['Port Blair Arrival', 'Light & Sound Show']
        },
        {
          day: 2,
          title: 'Havelock Island Beach Fun',
          description: 'Enjoy a day of beach fun at Havelock Island.',
          activities: ['Havelock Island Beach Fun']
        },
        {
          day: 3,
          title: 'Water Sports and Boat Rides',
          description: 'Indulge in water sports and boat rides.',
          activities: ['Water Sports', 'Boat Rides']
        },
        {
          day: 4,
          title: 'Return and Shopping',
          description: 'Return to Port Blair and enjoy shopping.',
          activities: ['Return to Port Blair', 'Shopping']
        },
        {
          day: 5,
          title: 'Departure',
          description: 'Check out and depart.',
          activities: ['Check-out', 'Departure']
        }
      ],
      inclusions: [
        { icon: 'fas fa-hotel', title: 'Accommodation', description: '4 Nights accommodation' },
        { icon: 'fas fa-car', title: 'Private Transfers', description: 'All transfers and sightseeing' },
        { icon: 'fas fa-ship', title: 'Ferry Transfers', description: 'Inter-island ferry transfers' },
        { icon: 'fas fa-water', title: 'Water Sports', description: 'Selected water sports activities' }
      ]
    },
    'ramoji-film-city-hyderabad-adventure': {
      trip: {
        id: 'ramoji-film-city-hyderabad-adventure',
        title: 'Ramoji Film City – Hyderabad Adventure',
        description: 'A creative and cinematic journey where fantasy comes alive—ideal for fun-loving families.',
        location: 'Hyderabad, India',
        duration: '3 Days / 2 Nights',
        price: 9499,
        image: 'https://gallery-rfc.s3.ap-south-1.amazonaws.com/packages-rfc/30663Packages.jpg',
        rating: 4.5,
        reviews: 160,
        features: ['Theme Park', 'Family', 'Culture', 'City Tour'],
        category: 'Family Holidays',
        groupDiscount: 5
      },
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Hyderabad',
          description: 'Arrive in Hyderabad and visit Charminar and local bazaar.',
          activities: ['Arrival in Hyderabad', 'Charminar', 'Local Bazaar']
        },
        {
          day: 2,
          title: 'Ramoji Film City',
          description: 'Enjoy a full-day adventure at Ramoji Film City.',
          activities: ['Full-day Ramoji Film City Adventure']
        },
        {
          day: 3,
          title: 'Snow World & Birla Planetarium and Departure',
          description: 'Visit Snow World & Birla Planetarium before departure.',
          activities: ['Snow World', 'Birla Planetarium', 'Departure']
        }
      ],
      inclusions: [
        { icon: 'fas fa-hotel', title: 'Accommodation', description: '2 Nights accommodation' },
        { icon: 'fas fa-car', title: 'Private Transfers', description: 'All transfers and sightseeing' },
        { icon: 'fas fa-ticket-alt', title: 'Entry Tickets', description: 'Entry to Ramoji Film City, Snow World, Birla Planetarium' }
      ]
    },
    'mesmerizing-maldives': {
      trip: {
        id: 'mesmerizing-maldives',
        title: 'Mesmerizing Maldives',
        description: 'Ultimate romantic and luxurious getaway with crystal-clear waters and white sandy beaches.',
        location: 'Maldives',
        duration: '4 Days / 3 Nights',
        price: 55999,
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=300&fit=crop',
        rating: 4.9,
        reviews: 350,
        features: ['Beach', 'Luxury', 'Romantic', 'Water Sports'],
        category: 'International Tours',
        groupDiscount: 15
      },
      itinerary: [
        {
          day: 1,
          title: 'Arrival and Resort Transfer',
          description: 'Arrive and transfer to your resort via speedboat. Enjoy the sunset view.',
          activities: ['Arrival', 'Speedboat Transfer to Resort', 'Sunset View']
        },
        {
          day: 2,
          title: 'Leisure Day',
          description: 'Enjoy a leisure day with snorkeling and paddle boarding.',
          activities: ['Snorkeling', 'Paddle Boarding']
        },
        {
          day: 3,
          title: 'Spa and Candlelight Dinner',
          description: 'Indulge in a spa session and a romantic candlelight dinner.',
          activities: ['Spa Session', 'Candlelight Dinner']
        },
        {
          day: 4,
          title: 'Departure',
          description: 'Check out and depart.',
          activities: ['Check-out', 'Departure']
        }
      ],
      inclusions: [
        { icon: 'fas fa-hotel', title: 'Beachfront Villa', description: 'Luxury beachfront villa accommodation' },
        { icon: 'fas fa-ship', title: 'Speedboat Transfers', description: 'Airport and resort speedboat transfers' },
        { icon: 'fas fa-utensils', title: 'Candlelight Dinner', description: 'One candlelight dinner' },
        { icon: 'fas fa-water', title: 'Water Sports', description: 'Selected non-motorized water sports' }
      ]
    },
    'singapore-family-adventure': {
      trip: {
        id: 'singapore-family-adventure',
        title: 'Singapore – Family Adventure',
        description: 'A futuristic city-state packed with attractions, eco-wonders, and culinary diversity.',
        location: 'Singapore',
        duration: '5 Days / 4 Nights',
        price: 62499,
        image: 'https://ignitetravelsolution.com/wp-content/uploads/2024/01/12-Top-Reasons-to-Visit-Singapore-with-Family-4.jpg',
        rating: 4.8,
        reviews: 300,
        features: ['City Tour', 'Family', 'Theme Park', 'Gardens'],
        category: 'International Tours',
        groupDiscount: 10
      },
      itinerary: [
        {
          day: 1,
          title: 'Arrival and Night Safari',
          description: 'Arrive in Singapore and enjoy the Night Safari.',
          activities: ['Arrival in Singapore', 'Night Safari']
        },
        {
          day: 2,
          title: 'City Tour',
          description: 'Enjoy a city tour including Merlion, Marina Bay Sands, and Chinatown.',
          activities: ['Merlion', 'Marina Bay Sands', 'Chinatown']
        },
        {
          day: 3,
          title: 'Universal Studios',
          description: 'Full-day adventure at Universal Studios.',
          activities: ['Universal Studios Full-day Adventure']
        },
        {
          day: 4,
          title: 'Sentosa Attractions',
          description: 'Explore Sentosa attractions including SEA Aquarium and a cable car ride.',
          activities: ['Sentosa Attractions', 'SEA Aquarium', 'Cable Car Ride']
        },
        {
          day: 5,
          title: 'Departure',
          description: 'Check out and depart.',
          activities: ['Check-out', 'Departure']
        }
      ],
      inclusions: [
        { icon: 'fas fa-hotel', title: 'Accommodation', description: '4 Nights accommodation' },
        { icon: 'fas fa-car', title: 'Private Transfers', description: 'All transfers and sightseeing' },
        { icon: 'fas fa-ticket-alt', title: 'Entry Tickets', description: 'Entry to Universal Studios, Gardens by the Bay, Night Safari, SEA Aquarium' }
      ]
    },
    'europe-highlights': {
      trip: {
        id: 'europe-highlights',
        title: 'Europe Highlights (Paris – Amsterdam – Switzerland)',
        description: 'A dream tour of romantic Paris, vibrant Amsterdam, and the scenic Swiss Alps all in one unforgettable experience.',
        location: 'Paris, Amsterdam, Switzerland',
        duration: '10 Days / 9 Nights',
        price: 189999,
        image: 'https://media.dpauls.com/drive-server/images/packages/france/paris/seine-river-cruise-with-eiffel-tower-paris-france.jpg',
        rating: 4.9,
        reviews: 400,
        features: ['City Tour', 'Culture', 'Mountains', 'Lakes'],
        category: 'International Tours',
        groupDiscount: 15
      },
      itinerary: [
        {
          day: 1,
          title: 'Paris Exploration (Day 1-3)',
          description: 'Explore Paris including Louvre, Eiffel Tower, and Seine cruise.',
          activities: ['Louvre Museum', 'Eiffel Tower', 'Seine River Cruise']
        },
        {
          day: 2,
          title: 'Amsterdam Exploration (Day 4-5)',
          description: 'Explore Amsterdam with a canal tour and Tulip Garden (seasonal).',
          activities: ['Canal Tour', 'Tulip Garden (seasonal)']
        },
        {
          day: 3,
          title: 'Switzerland Exploration (Day 6-10)',
          description: 'Explore Lucerne & Interlaken including Mt. Titlis, Rhine Falls, and Swiss transport pass.',
          activities: ['Mt. Titlis', 'Rhine Falls', 'Swiss Transport Pass']
        }
      ],
      inclusions: [
        { icon: 'fas fa-hotel', title: 'Accommodation', description: '9 Nights accommodation in 3-star hotels' },
        { icon: 'fas fa-plane', title: 'Flights', description: 'Return flights from India' },
        { icon: 'fas fa-train', title: 'Inter-city Transfers', description: 'High-speed train transfers between cities' },
        { icon: 'fas fa-ticket-alt', title: 'Entry Tickets', description: 'Entry to major attractions' }
      ]
    },
    'jaipur-weekend-getaway': {
      trip: {
        id: 'jaipur-weekend-getaway',
        title: 'Jaipur Weekend Getaway (From Delhi)',
        description: 'Just a few hours from Delhi, Jaipur offers royal vibes, street food, and handicrafts for a quick royal escape.',
        location: 'Jaipur, India',
        duration: '2 Days / 1 Night',
        price: 5999,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQFs-Ds3SLAgeZO5Ne0mPXozH6BWujVoGi7A&s',
        rating: 4.5,
        reviews: 100,
        features: ['Heritage', 'Culture', 'Markets', 'Weekend'],
        category: 'Weekend Road Trips',
        groupDiscount: 5
      },
      itinerary: [
        {
          day: 1,
          title: 'Drive from Delhi and Jaipur Sightseeing',
          description: 'Drive from Delhi. Visit Amer Fort, Hawa Mahal, Chokhi Dhani.',
          activities: ['Drive from Delhi', 'Amer Fort', 'Hawa Mahal', 'Chokhi Dhani']
        },
        {
          day: 2,
          title: 'City Palace and Shopping',
          description: 'Visit City Palace, enjoy shopping at Bapu Bazaar before returning.',
          activities: ['City Palace', 'Shopping at Bapu Bazaar', 'Return']
        }
      ],
      inclusions: [
        { icon: 'fas fa-hotel', title: 'Accommodation', description: '1 Night accommodation' },
        { icon: 'fas fa-car', title: 'Private Transfers', description: 'All transfers and sightseeing' }
      ]
    },
    'rishikesh-adventure-trip': {
      trip: {
        id: 'rishikesh-adventure-trip',
        title: 'Rishikesh Adventure Trip',
        description: 'Ideal for adventure lovers looking for a quick weekend thrill.',
        location: 'Rishikesh, India',
        duration: '2 Days / 1 Night',
        price: 4499,
        image: 'https://www.lovelytrails.com/admin/image.php?path=privateToursImages%2F16274784070.jpg',
        rating: 4.6,
        reviews: 130,
        features: ['Adventure', 'River Rafting', 'Camping', 'Weekend'],
        category: 'Weekend Road Trips',
        groupDiscount: 5
      },
      itinerary: [
        {
          day: 1,
          title: 'Arrival and Adventure Activities',
          description: 'Arrive and check-in to camp. Enjoy river rafting and bonfire.',
          activities: ['Arrival and Camp Check-in', 'River Rafting', 'Bonfire']
        },
        {
          day: 2,
          title: 'Ganga Aarti and Departure',
          description: 'Witness Ganga Aarti before returning.',
          activities: ['Ganga Aarti', 'Departure']
        }
      ],
      inclusions: [
        { icon: 'fas fa-campground', title: 'Camping', description: '1 Night camping' },
        { icon: 'fas fa-water', title: 'River Rafting', description: 'River rafting session' },
        { icon: 'fas fa-utensils', title: 'Meals', description: 'Breakfast and Dinner during camping' }
      ]
    },
    'agra-fatehpur-sikri-quick-tour': {
      trip: {
        id: 'agra-fatehpur-sikri-quick-tour',
        title: 'Agra & Fatehpur Sikri Quick Tour',
        description: 'Witness the timeless beauty of the Taj Mahal and Mughal architectural gems.',
        location: 'Agra & Fatehpur Sikri, India',
        duration: '2 Days / 1 Night',
        price: 4999,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWxb7RlUTUxiW4Pa-qVPWl7s5zjagdwiOB4w&s',
        rating: 4.7,
        reviews: 110,
        features: ['Heritage', 'Culture', 'Monuments', 'Weekend'],
        category: 'Weekend Road Trips',
        groupDiscount: 5
      },
      itinerary: [
        {
          day: 1,
          title: 'Drive to Agra and Sightseeing',
          description: 'Drive to Agra. Visit Taj Mahal & Agra Fort.',
          activities: ['Drive to Agra', 'Taj Mahal', 'Agra Fort']
        },
        {
          day: 2,
          title: 'Fatehpur Sikri and Return',
          description: 'Excursion to Fatehpur Sikri before returning.',
          activities: ['Fatehpur Sikri Excursion', 'Return']
        }
      ],
      inclusions: [
        { icon: 'fas fa-hotel', title: 'Accommodation', description: '1 Night accommodation' },
        { icon: 'fas fa-car', title: 'Private Transfers', description: 'All transfers and sightseeing' },
        { icon: 'fas fa-landmark', title: 'Entry Tickets', description: 'Entry to Taj Mahal and Agra Fort' }
      ]
    },
    'mahabaleshwar-nature-drive': {
      trip: {
        id: 'mahabaleshwar-nature-drive',
        title: 'Mahabaleshwar Nature Drive (From Mumbai/Pune)',
        description: 'A refreshing escape to the lush green hills and scenic viewpoints of Mahabaleshwar.',
        location: 'Mahabaleshwar, India',
        duration: '2 Days / 1 Night',
        price: 6499,
        image: 'https://assets.cntraveller.in/photos/60ba1796e341ff812178e57a/16:9/w_1360,h_765,c_limit/Untitled-design-22-1366x768.jpg',
        rating: 4.5,
        reviews: 90,
        features: ['Nature', 'Hills', 'Viewpoints', 'Weekend'],
        category: 'Weekend Road Trips',
        groupDiscount: 5
      },
      itinerary: [
        {
          day: 1,
          title: 'Drive to Mahabaleshwar and Local Sightseeing',
          description: 'Drive to Mahabaleshwar. Visit popular viewpoints like Arthur’s Seat, Kate’s Point, and Needle Hole Point.',
          activities: ['Drive to Mahabaleshwar', 'Arthur’s Seat', 'Kate’s Point', 'Needle Hole Point']
        },
        {
          day: 2,
          title: 'Pratapgad Fort and Departure',
          description: 'Visit Pratapgad Fort and explore local markets before departure.',
          activities: ['Pratapgad Fort', 'Local Markets', 'Departure']
        }
      ],
      inclusions: [
        { icon: 'fas fa-hotel', title: 'Accommodation', description: '1 Night accommodation' },
        { icon: 'fas fa-car', title: 'Private Transfers', description: 'All transfers and sightseeing' }
      ]
    }
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Get trip ID from route parameters
    // const tripId = this.route.snapshot.paramMap.get('id');

    // if (tripId && this.allTrips[tripId]) {
    //   this.trip = this.allTrips[tripId].trip;
    // } else {
    //   // Default fallback trip
    //   this.trip = {
    //     id: 'default',
    //     title: 'Amazing Adventure',
    //     description: 'Discover incredible destinations and create unforgettable memories.',
    //     location: 'Various Locations',
    //     duration: '5 Days',
    //     price: 15999,
    //     image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
    //     rating: 4.5,
    //     reviews: 100,
    //     features: ['Adventure', 'Culture', 'Nature', 'Food'],
    //     category: 'Adventure Tours'
    //   };
    // }

    const tripId = this.route.snapshot.paramMap.get('id');
    this.trip = tripId && this.allTrips[tripId] ? this.allTrips[tripId].trip : {
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
    this.updateShareLinks();
  }
//   private updateShareLinks() {
//     if (!this.trip) return;

//     const data = this.getCurrentTripData();
//     const firstDays = (data?.itinerary || [])
//       .slice(0, 3)
//       .map((d: any) => `Day ${d.day}: ${d.title}`)
//       .join('\n');

//     this.shareSubject = `${this.trip.title} — ${this.trip.duration} · from ₹${this.trip.price}`;
//     this.shareText =
//       `${this.trip.title}
// ${this.trip.location} • ${this.trip.duration}

// ${this.trip.description}

// Highlights: ${this.trip.features?.join(', ')}

// ${firstDays ? `Itinerary preview:\n${firstDays}\n` : ''}More details: ${window.location.href}`;

//     // email prefers CRLF
//     const body = this.shareText.replace(/\n/g, '\r\n');

//     this.mailtoUrl = `mailto:?subject=${encodeURIComponent(this.shareSubject)}&body=${encodeURIComponent(body)}`;
//     this.waUrl = `https://wa.me/?text=${encodeURIComponent(this.shareText)}`;
//   }

  private updateShareLinks() {
    if (!this.trip) return;

    const trip = this.trip;
    const data = this.getCurrentTripData();

    const price = new Intl.NumberFormat('en-IN').format(trip.price);
    const highlights = (trip.features || []).slice(0, 5).join(' • ');
    const ratingLine = trip.rating
      ? `★ ${trip.rating}/5${trip.reviews ? ` (${trip.reviews}+ reviews)` : ''}`
      : '';

    const itineraryPreview = (data?.itinerary || [])
      .slice(0, 3)
      .map((d: any) => `${d.day}) ${d.title}`)
      .join('\n');

    this.shareSubject = `${trip.title} — ${trip.duration} · from ₹${price}`;

    // ASCII-only, WhatsApp-friendly text (no emojis)
    this.shareText =
      `*${trip.title}* · _${trip.duration}_
${ratingLine}
Location: ${trip.location}
Price: From ₹${price} per person

${trip.description}

*Highlights:* ${highlights}

*Itinerary at a glance*
${itineraryPreview}

More details & booking:
${window.location.href}`;

    // Email prefers CRLF
    const emailBody = this.shareText.replace(/\n/g, '\r\n');
    this.mailtoUrl = `mailto:?subject=${encodeURIComponent(this.shareSubject)}&body=${encodeURIComponent(emailBody)}`;
    this.waUrl = `https://wa.me/?text=${encodeURIComponent(this.shareText)}`;
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

  private getPublicUrl(): string {
    const u = new URL(window.location.href);
    const isLocal = u.hostname === 'localhost' || u.hostname === '127.0.0.1';
    const isProd = u.hostname === 'globaleasetrip.com' || u.hostname === 'www.globaleasetrip.com';

    if (isLocal) {
      // Mirror current path/query/hash onto prod
      return `https://globaleasetrip.com${u.pathname}${u.search}${u.hash}`;
    }

    if (isProd) {
      // Ensure HTTPS on prod (and strip default :80/:443 if present)
      const hostNoDefaultPort = u.host.replace(/:80$|:443$/, '');
      return `https://${hostNoDefaultPort}${u.pathname}${u.search}${u.hash}`;
    }

    // Any other host: prefer HTTPS, otherwise keep as-is
    return u.protocol === 'http:'
      ? `https://${u.host}${u.pathname}${u.search}${u.hash}`
      : u.href;
  }

  private buildWhatsAppUrl(text: string, phone?: string): string {
    const url = new URL('https://api.whatsapp.com/send'); // works for Web & Mobile
    if (phone) url.searchParams.set('phone', phone);
    url.searchParams.set('text', text); // auto-encodes; DON'T encodeURIComponent again
    return url.toString();
  }

  openBookingForm() {
    if (!this.trip) return;

    const t = this.trip;
    const price = new Intl.NumberFormat('en-IN').format(t.price);
    const link = this.getPublicUrl();

    const msg = [
      `Hi! I'd like to book:`,
      ``,
      `*${t.title}* · _${t.duration}_`,
      `${t.location} • From ₹${price} per person`,
      ``,
      `Please confirm availability and next steps.`,
      ``,
      `— My details —`,
      `Preferred dates: [dd-mm-yyyy] to [dd-mm-yyyy]`,
      `Travellers: Adults __ | Children __`,
      `Pickup city: [Your city]`,
      `Special requests: [optional]`,
      ``,
      `Trip link:`,
      link
    ].join('\n').trim();

    const waUrl = this.buildWhatsAppUrl(msg, this.OWNER_WA);

    // Most reliable redirect for WhatsApp Web
    try {
      window.location.href = waUrl;
    } catch {
      // Fallback if something blocks location change
      const a = document.createElement('a');
      a.href = waUrl;
      a.target = '_blank';
      a.rel = 'noopener';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
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


  openWhatsApp() {
    if (!this.trip) return;
    const t = this.trip;
    console.log('WhatsApp button clicked');
    const phone = '918938962400';
    const message = `I want to Inquiry about this trip ${t.title}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  }
}

