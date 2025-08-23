import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  sourceUrl?: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, CommonModule, FormsModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class BlogComponent implements OnInit {
  selectedCategory = 'All';
  visibleCount = 6;
  showAll = false;
  email = '';
  loading = false;
  status = '';
  // Paste your Apps Script Web App URL here:
  private WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbygiReWPzjsbORsx5ewJ-9MPau-U_5bmAaAoa5Z_kaGXg7ytQ_1CsKECPAUISQs9r5-/exec';


  categories = [
    'All',
    'Travel Tips & Guides',
    'Destination Highlights',
    'Adventure & Activities',
    'Corporate & Group Travel',
    'Romantic & Honeymoon Travel'
  ];

  articles: BlogArticle[] = [
    // Travel Tips & Guides
    {
      id: '1',
      title: 'Top 10 visa-free countries for Indian',
      excerpt: 'Indian passport holders can now visit vibrant cities, tranquil beaches, and cultural hubs across the world –– visa-free, thanks to growing global ties that have made international travel easier than ever.',
      category: 'Travel Tips & Guides',
      date: 'July 16, 2025',
      image: 'https://images.unsplash.com/photo-1553697388-94e804e2f0f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dmlzYXxlbnwwfHwwfHx8MA%3D%3D',
      author: {
        name: 'The Indian Express',
        avatar: 'https://indianexpress.com/wp-content/themes/indianexpress/images/indian-express-logo-n.svg'
      },
      sourceUrl: 'https://indianexpress.com/article/trending/top-10-listing/top-10-visa-free-countries-for-indian-passport-holders-in-2025-10130671/'
    },
    {
      id: '2',
      title: 'Explore More, Spend Less: Budget-Friendly International Destinations for Indian Travelers.',
      excerpt: 'Quick, easy-to-plan international travel ideas for Indian travellers looking to make the most of a few days off. This list brings together cultural hotspots, scenic escapes, and destinations with hassle-free visa options.',
      category: 'Travel Tips & Guides',
      date: 'December 21, 2023',
      image: 'https://media.istockphoto.com/id/698900018/photo/world-landmarks-photo-collage-isolated-on-white-background-travel-tourism-and-study-around-the.webp?a=1&b=1&s=612x612&w=0&k=20&c=t1V1fgTDABQWmYZx0WRhjagzetTWzVlbwgSE5daCCgA=',
      author: {
        name: 'Niyo',
        avatar: 'https://goniyo.com/images/brand_logo.svg'
      },
      sourceUrl: 'https://goniyo.com/blog/best-international-destinations-from-india'
    },
    {
      id: '3',
      title: 'Ultimate Carry-On Packing Guide for International Trips',
      excerpt: 'When it comes to preparing for a trip, I always start packing well in advance. My husband on the other hand waits until the last possible minute. Sound familiar to anyone else? If you are like us, check out my ultimate packing list below to make sure that you don’t forget anything!',
      category: 'Travel Tips & Guides',
      date: 'March 19, 2023',
      image: 'https://images.unsplash.com/photo-1551709270-acfb7c3988b5?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      author: {
        name: 'Online Writing Club',
        avatar: 'https://miro.medium.com/v2/da:true/resize:fill:88:88/0*-B0q8C7AP7_lNK1t'
      },
      sourceUrl: 'https://medium.com/@makeaplanblog/ultimate-packing-list-d76c02fbb6b6'
    },
    {
      id: '4',
      title: 'Solo Travel Safety Tips for First-Time International Travelers',
      excerpt: 'There’s a first time for everything, and your first solo travel experience should be an adventure of a lifetime! Solo travel has a lot of benefits and can be a real confidence-boosting experience. It has a lot to teach us as we explore the world around us.',
      category: 'Travel Tips & Guides',
      date: 'Jan 11, 2022',
      image: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*vwr9NmNI0oro7OdvVZRvtg.png',
      author: {
        name: 'Kelsey L.O.',
        avatar: 'https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybHxlbnwwfHwwfHx8MA%3D%3D'
      },
      sourceUrl: 'https://medium.com/the-post-grad-survival-guide/five-safety-tips-for-solo-travel-first-timers-57f2e3487276'
    },
    {
      id: '5',
      title: '10 cheapest countries to visit from India',
      excerpt: 'International travel doesn’t always mean spending big. For Indian travellers, there are several countries offering affordable round-trip flights, low daily expenses, and convenient visa policies. ',
      category: 'Travel Tips & Guides',
      date: 'June 25, 2025',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
      author: {
        name: 'The Economic Times',
        avatar: 'https://indianexpress.com/wp-content/themes/indianexpress/images/indian-express-logo-n.svg'
      },
      sourceUrl: 'https://economictimes.indiatimes.com/nri/visit/10-cheapest-countries-to-visit-from-india/nepal/slideshow/122069181.cms'
    },

    // Destination Highlights


    {
      id: '6',
      title: 'Unveiling Hidden Gems: Off-the-Beaten-Path Travel Destinations',
      excerpt: 'Discover lesser-known destinations that offer rich culture, breathtaking landscapes, and zero tourist crowds. Perfect for travelers who want unique and soulful experiences.',
      category: 'Destination Highlights',
      date: 'September 06, 2023',
      image: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*JlXmKmKjhr10Jp7hyh2N_A.jpeg',
      author: {
        name: 'LUCIFER',
        avatar: 'https://miro.medium.com/v2/resize:fill:88:88/1*aYFz_SA6m-iEgcNS99cCrg.jpeg'
      },
      sourceUrl: 'https://medium.com/@canikissyou95867/unveiling-hidden-gems-off-the-beaten-path-travel-destinations-15d167afe239'
    },
    {
      id: '7',
      title: 'Set-Jetting: Travel Inspired by TV Shows & Films',
      excerpt: 'Explore real-life filming locations from your favorite movies and series—where Hollywood meets wanderlust. A must-read for cinephiles with a case of travel fever.',
      category: 'Destination Highlights',
      date: 'February 21, 2024',
      image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*sfwwOjCddy3mC2uKb9gAJA.jpeg',
      author: {
        name: 'Trameter Stories',
        avatar: 'https://miro.medium.com/v2/resize:fill:88:88/1*axVogtuczZ22pqZxeG6QNw.png'
      },
      sourceUrl: 'https://medium.com/trameter-stories/set-jetting-adventures-for-2024-b0f908f1ad06'
    },
    {
      id: '8',
      title: 'Noctourism: Best Stargazing & Night Sky Travel Destinations',
      excerpt: 'Leave city lights behind and immerse yourself in the magic of the cosmos. These locations offer the most mesmerizing night skies on Earth.',
      category: 'Destination Highlights',
      date: 'July 23, 2025',
      image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/0*nhRtA8vlu4qbacc-',
      author: {
        name: 'Kalpana Atluri',
        avatar: 'https://miro.medium.com/v2/resize:fill:88:88/1*GimTSN8-Pe9qDzupaVEXEQ@2x.jpeg'
      },
      sourceUrl: 'https://medium.com/@kalpana23/noctourism-exploring-the-world-after-dark-16e289760e13'
    },
    {
      id: '9',
      title: 'Sustainable Travel Exploring the World Responsibly',
      excerpt: 'In an era where environmental consciousness is paramount, sustainable travel has emerged as a powerful concept, reshaping the way we explore the world. This article delves into the importance of sustainable travel, its environmental implications, and how individuals can make conscious choices to explore the world responsibly.Zoom image will be displayed',
      category: 'Destination Highlights',
      date: 'Jan 27, 2024',
      image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*e7oFDclN9fqj3-UhSRBT5Q.jpeg',
      author: {
        name: 'Corentin Jacques',
        avatar: 'https://miro.medium.com/v2/resize:fill:88:88/1*hWvZ8qNHTrYQOrmzgx6ifw.jpeg'
      },
      sourceUrl: 'https://medium.com/@corentinjacques/sustainable-travel-exploring-the-world-responsibly-8170d018e015'
    },
    {
      id: '10',
      title: '15 Underrated Destinations to Visit Before 2025',
      excerpt: 'These rising star locations are quickly climbing the must-visit charts—beat the crowd and explore their raw charm before the buzz catches on.',
      category: 'Destination Highlights',
      date: 'September 14, 2024',
      image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*YF7JNwnhPKeQWYg1lBpY0A.jpeg',
      author: {
        name: 'Shweta L',
        avatar: 'https://miro.medium.com/v2/resize:fill:88:88/1*7hAdGz1a_22DXDnpUumJxA@2x.jpeg'
      },
      sourceUrl: 'https://medium.com/@corentinjacques/sustainable-travel-exploring-the-world-responsibly-8170d018e015https://miro.medium.com/v2/resize:fit:720/format:webp/1*YF7JNwnhPKeQWYg1lBpY0A.jpeg'
    },


    // Adventure & Activities
    {
      id: '11',
      title: 'The Darker Side of High-Altitude Himalayan Trekking',
      excerpt: 'An honest and emotional story from the Phulara Ridge trek in the Himalayas, exploring the physical and mental challenges of high-altitude expeditions.',
      category: 'Adventure & Activities',
      date: 'June 28, 2023',
      image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*yw7caFgvTC_61cWV8lsNMA.jpeg',
      author: {
        name: 'Deepika Karanji',
        avatar: 'https://miro.medium.com/v2/resize:fill:88:88/1*pkhDFc0hrxFTeznJOzxoJw.jpeg'
      },
      sourceUrl: 'https://medium.com/@deepikaKaranji/the-darker-side-of-high-altitude-himalayan-trekking-a-phulara-ridge-story-d9f501b030aa'
    },
    {
      id: '12',
      title: ' Action Sports & Athletic Adventure Trave',
      excerpt: 'A deep dive into how action sports like surfing, climbing, and kiteboarding are driving the future of adventure travel around the world.',
      category: 'Adventure & Activities',
      date: 'March 14, 2024',
      image: 'https://assets.vogue.com/photos/5f3d71b17dcabb30509d13b2/master/w_1600,c_limit/vo070118_bowie01.jpg',
      author: {
        name: 'Vogue',
        avatar: 'https://www.vogue.com/favicon.ico'
      },
      sourceUrl: 'https://www.vogue.com/article/action-sports-travel-boom'
    },
    {
      id: '13',
      title: 'Eco-Tourism: Where Nature Meets Culture',
      excerpt: 'Eco-adventures that go beyond sightseeing—connect with local communities and explore natural landscapes while treading lightly on the planet.',
      category: 'Adventure & Activities',
      date: 'Febraury 16, 2024',
      image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/0*L_THXlvFOv-fM8G2',
      author: {
        name: 'Sher Ilyas',
        avatar: 'https://miro.medium.com/v2/resize:fill:88:88/1*kjTAYNr8yzVpMsPeaBLmXA.png'
      },
      sourceUrl: 'https://sherilyasghizri99.medium.com/eco-tourism-cc2dc82a8439'
    },
    {
      id: '14',
      title: 'Inclusive & Women-Only Adventure Travel - The Power of Solo Travel',
      excerpt: 'A passionate narrative on why more women are choosing to explore the world on their own terms—and how adventure travel empowers them.',
      category: 'Adventure & Activities',
      date: 'March 31, 2025',
      image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*8GFNyvBNEDmhKcKRoUhAyg.jpeg',
      author: {
        name: 'Jenn Underwood',
        avatar: 'https://miro.medium.com/v2/resize:fill:88:88/1*KSf1xFfwDB9h7E6REgDxwA.jpeg'
      },
      sourceUrl: 'https://medium.com/@jennunderwood/the-power-of-solo-travel-f24779a62183'
    },
    {
      id: '15',
      title: 'Beyond the Beach: Why Your Next Cruise Should Be an Expedition',
      excerpt: 'Discover a new wave of adventure travel: from glamping under the stars to coasteering through rugged coastlines—this is not your usual cruise.',
      category: 'Adventure & Activities',
      date: 'July 12, 2025',
      image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/0*l_MhVAmRqaZ0_psC',
      author: {
        name: 'Kalpana',
        avatar: 'https://miro.medium.com/v2/resize:fill:88:88/1*GimTSN8-Pe9qDzupaVEXEQ@2x.jpeg'
      },
      sourceUrl: 'https://medium.com/@kalpana23/beyond-the-beach-why-your-next-cruise-should-be-an-epic-expedition-54927cca31c8'
    },

    // Corporate & Group Travel

    {
      id: '16',
      title: 'The Rise of Bleisure Travel: Merging Business with Leisure',
      excerpt: 'Explore how professionals are extending business trips into mini-vacations—blending work and wanderlust while staying in luxurious accommodations.',
      category: 'Corporate & Group Travel',
      date: 'Oct 24, 2024',
      image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/0*CIpPhyh4IIw5dNQd.png',
      author: {
        name: 'SquareCut Solution',
        avatar: 'https://miro.medium.com/v2/da:true/resize:fill:88:88/0*_yB-Wk5rsRO30BLA'
      },
      sourceUrl: 'https://medium.com/@squarecutsolution/the-rise-of-bleisure-travel-merging-business-with-leisure-in-luxury-hotels-478dc6b9bba2'
    },
    {
      id: '17',
      title: 'Sustainable Travel Guide: Eco-Friendly Corporate Journeys',
      excerpt: 'This guide highlights how companies can embrace sustainability in their travel policies—from carbon offsetting to choosing eco-hotels.',
      category: 'Corporate & Group Travel',
      date: 'October 28, 2025',
      image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/0*r55mnXogQ5D0pDe6.jpg',
      author: {
        name: 'Geniefie',
        avatar: 'https://miro.medium.com/v2/resize:fill:88:88/1*I_FKID6EPQF8CgWhI-60-A.png'
      },
      sourceUrl: 'https://miro.medium.com/v2/resize:fit:720/format:webp/0*r55mnXogQ5D0pDe6.jpg'
    },
    {
      id: '18',
      title: 'The Benefits of Wellness-Focused Corporate Travel',
      excerpt: 'Corporate travel is evolving to prioritize employee well-being. Discover how mindfulness, spa stays, and downtime are boosting productivity.',
      category: 'Corporate & Group Travel',
      date: 'March 21, 2023',
      image: 'https://miro.medium.com/v2/resize:fit:640/format:webp/0*5I66CqaNQqZuW6t6',
      author: {
        name: 'Tess DiNapoli',
        avatar: 'https://miro.medium.com/v2/resize:fill:88:88/2*vUrwj0Tk9KesaBdXSOP3uA.jpeg'
      },
      sourceUrl: 'https://medium.com/enjoy-life-and-travel/benefits-of-incorporating-wellness-into-corporate-travel-be35597a83d2'
    },
    {
      id: '19',
      title: 'A Multigenerational Trip to Maui',
      excerpt: 'Planning a trip with multiple generations? This heartfelt journey to Maui offers insights on balancing fun, relaxation, and family bonding.',
      category: 'Corporate & Group Travel',
      date: 'April 26, 2014',
      image: 'https://miro.medium.com/v2/resize:fit:640/format:webp/0*Mi8mub0KFuUVXeNQ.jpg',
      author: {
        name: 'Doug Bardwell',
        avatar: 'https://miro.medium.com/v2/resize:fill:88:88/0*-UHyTwHEk_352tc2.jpg'
      },
      sourceUrl: 'https://photodb.medium.com/a-multigenerational-trip-to-maui-20cc198c1407'
    },



    // Romantic & Honeymoon Travel


    {
      id: '20',
      title: '10 Unique Destinations for an Unforgettable Honeymoon',
      excerpt: 'Step beyond the typical tourist spots—this list of offbeat honeymoon destinations promises unforgettable memories in places most couples haven’t even heard of.',
      category: 'Romantic & Honeymoon Travel',
      date: 'June 14, 2018',
      image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/0*NBmGPdbg9vH_gUbR.jpg',
      author: {
        name: 'Jubel Co',
        avatar: 'https://miro.medium.com/v2/resize:fill:88:88/1*qBhqH8OolDuZZ-C7TXTRmQ.png'
      },
      sourceUrl: 'https://medium.com/jubel-co/10-unique-destinations-for-an-unforgettable-honeymoon-b0175a1ca61b'
    },
    {
      id: '21',
      title: 'The Luxury Private Island That Travelers Say Is Worth It',
      excerpt: 'Discover the ultimate secluded escape: this private island is redefining luxury with white-sand beaches, crystal waters, and privacy that’s priceless.',
      category: 'Romantic & Honeymoon Travel',
      date: 'July 9, 2024',
      image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/0*ysOP0Gu_VCUE_41Q.jpg',
      author: {
        name: 'Caribbean Lifestyle Belize',
        avatar: 'https://miro.medium.com/v2/resize:fill:88:88/2*pQkcDTX297wDzwhgn37oTA.jpeg'
      },
      sourceUrl: 'https://medium.com/@caribbeanlifestylebelize/the-luxury-private-island-that-travelers-say-is-worth-the-price-tag-d4f25624f267'
    },
    {
      id: '22',
      title: 'All Aboard: Unforgettable Luxury Train Honeymoons',
      excerpt: 'Indulge in slow, scenic journeys where the romance is in the ride. These luxury train trips are perfect for couples looking to honeymoon in style.',
      category: 'Romantic & Honeymoon Travel',
      date: 'July 22, 2023',
      image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*UM18P1MSFJv7XBvpQel5JQ.png',
      author: {
        name: 'Lone Star Glitz Travel',
        avatar: 'https://miro.medium.com/v2/resize:fill:88:88/1*qBhqH8OolDuZZ-C7TXTRmQ.png'
      },
      sourceUrl: 'https://lonestarglitztravel.medium.com/all-aboard-the-most-unforgettable-luxury-train-journeys-d4a7f8ed36ef'
    }



  ];

  filteredArticles: BlogArticle[] = [];
  allFiltered: BlogArticle[] = [];



  ngOnInit() {
    this.updateFilteredArticles();
    // this.filteredArticles = [...this.articles];
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.showAll = false;
    this.updateFilteredArticles();
    if (category === 'All') {
      this.filteredArticles = [...this.articles];
    } else {
      this.filteredArticles = this.articles.filter(article => article.category === category);
    }
  }
  updateFilteredArticles() {
    this.allFiltered = this.selectedCategory === 'All'
      ? this.articles
      : this.articles.filter(article => article.category === this.selectedCategory);

    this.filteredArticles = this.showAll
      ? this.allFiltered
      : this.allFiltered.slice(0, this.visibleCount);
  }
  toggleShowAll() {
    this.showAll = !this.showAll;
    this.updateFilteredArticles();
  }
  getFilteredList(): BlogArticle[] {
    return this.selectedCategory === 'All'
      ? this.articles
      : this.articles.filter(article => article.category === this.selectedCategory);
  }

  async subscribe() {
    const em = (this.email || '').trim();

    if (!this.isValidEmail(em)) {
      this.status = 'Please enter a valid email address.';
      return;
    }

    this.loading = true;
    this.status = '';

    try {
      // Send as form-encoded to keep it a "simple request"
      // Use no-cors to avoid CORS preflight on localhost
      const body = new URLSearchParams({ email: em });

      await fetch(this.WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors', // avoids CORS issues on localhost & prod
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      });

      // In no-cors we can't read the response; optimistically confirm
      this.status = '🙌 Thank you for subscribing!';
      this.email = '';
    } catch (err) {
      console.error(err);
      this.status = 'Opps Subscription failed. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  private isValidEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }


}




