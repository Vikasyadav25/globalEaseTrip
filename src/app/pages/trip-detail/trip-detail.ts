import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Trip } from '../../components/trip-card/trip-card';

interface ItineraryDay {
  title: string;
  description: string;
  activities: string[];
}

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-detail.html',
  styleUrl: './trip-detail.css'
})
export class TripDetailComponent implements OnInit {
  trip: Trip | null = null;
  
  itinerary: ItineraryDay[] = [
    {
      title: 'Arrival and City Exploration',
      description: 'Arrive at your destination and begin your adventure with a guided city tour to get oriented with the local culture and landmarks.',
      activities: ['Airport Transfer', 'City Tour', 'Welcome Dinner']
    },
    {
      title: 'Cultural Immersion Day',
      description: 'Dive deep into the local culture with visits to historical sites, museums, and traditional markets.',
      activities: ['Museum Visit', 'Local Market', 'Cultural Workshop']
    },
    {
      title: 'Adventure and Nature',
      description: 'Experience the natural beauty of the region with outdoor activities and scenic excursions.',
      activities: ['Hiking', 'Scenic Views', 'Photography']
    },
    {
      title: 'Leisure and Departure',
      description: 'Enjoy some free time for shopping or relaxation before your departure transfer to the airport.',
      activities: ['Free Time', 'Shopping', 'Departure Transfer']
    }
  ];

  // Sample trip data - in a real app, this would come from a service
  sampleTrip: Trip = {
    id: '1',
    title: 'Magical Bali Adventure',
    description: 'Explore the beautiful temples, pristine beaches, and lush rice terraces of Bali. Experience the rich culture and warm hospitality of the Balinese people.',
    location: 'Bali, Indonesia',
    duration: '7 Days',
    price: 899,
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop',
    rating: 4.8,
    reviews: 124,
    features: ['Temples', 'Beaches', 'Culture', 'Food'],
    groupDiscount: 10
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Get trip ID from route parameters
    const tripId = this.route.snapshot.paramMap.get('id');
    
    // In a real app, you would fetch the trip data from a service
    // For now, we'll use sample data
    this.trip = this.sampleTrip;
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  openBookingForm() {
    // Open Google Form in new window
    const googleFormUrl = 'https://forms.google.com/your-booking-form-id';
    window.open(googleFormUrl, '_blank');
  }
}

