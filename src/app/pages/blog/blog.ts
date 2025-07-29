import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class BlogComponent implements OnInit {
  selectedCategory = 'All';
  
  categories = [
    'All',
    'Travel Tips',
    'Destination Guides',
    'Food & Culture',
    'Adventure',
    'Budget Travel',
    'Photography'
  ];

  articles: BlogArticle[] = [
    {
      id: '1',
      title: 'Best Time to Visit Southeast Asia: A Complete Guide',
      excerpt: 'Discover the optimal seasons for exploring Thailand, Vietnam, Cambodia, and more. Learn about weather patterns, festivals, and crowd levels.',
      category: 'Destination Guides',
      date: 'March 10, 2024',
      image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&h=300&fit=crop',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: '2',
      title: 'Packing Light: The Ultimate Minimalist Travel Guide',
      excerpt: 'Learn how to pack everything you need in just a carry-on bag. Tips for choosing versatile clothing and essential travel gear.',
      category: 'Travel Tips',
      date: 'March 8, 2024',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
      author: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: '3',
      title: 'Street Food Adventures: A Culinary Journey Through Bangkok',
      excerpt: 'Explore the vibrant street food scene of Bangkok. From pad thai to mango sticky rice, discover the best local flavors.',
      category: 'Food & Culture',
      date: 'March 5, 2024',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
      author: {
        name: 'Emma Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: '4',
      title: 'Hiking the Inca Trail: Everything You Need to Know',
      excerpt: 'Complete guide to trekking to Machu Picchu. Preparation tips, what to expect, and how to make the most of this incredible journey.',
      category: 'Adventure',
      date: 'March 3, 2024',
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&h=300&fit=crop',
      author: {
        name: 'David Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: '5',
      title: 'Budget Travel in Europe: How to See More for Less',
      excerpt: 'Discover money-saving tips for exploring Europe on a budget. From accommodation hacks to free attractions and cheap eats.',
      category: 'Budget Travel',
      date: 'February 28, 2024',
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop',
      author: {
        name: 'Lisa Thompson',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: '6',
      title: 'Capturing the Perfect Travel Photo: Tips from a Pro',
      excerpt: 'Learn photography techniques to make your travel photos stand out. Composition, lighting, and editing tips for stunning results.',
      category: 'Photography',
      date: 'February 25, 2024',
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      author: {
        name: 'Alex Kim',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      }
    }
  ];

  filteredArticles: BlogArticle[] = [];

  ngOnInit() {
    this.filteredArticles = [...this.articles];
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    
    if (category === 'All') {
      this.filteredArticles = [...this.articles];
    } else {
      this.filteredArticles = this.articles.filter(article => article.category === category);
    }
  }
}

