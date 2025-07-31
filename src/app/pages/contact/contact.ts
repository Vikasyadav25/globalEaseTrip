import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent {
  form: FormGroup;
  
  openedIndex: number | null = null;

   faqs = [
    {
      question: 'How far in advance should I book my trip?',
      answer: 'We recommend booking at least 2-3 months in advance for international trips and 4-6 weeks for domestic travel to ensure the best availability and prices.'
    },
    {
      question: 'Do you offer travel insurance?',
      answer: 'Yes, we partner with leading travel insurance providers to offer comprehensive coverage options for your peace of mind.'
    },
    {
      question: 'Can you create custom itineraries?',
      answer: 'Absolutely! We specialize in creating personalized travel experiences tailored to your interests, budget, and schedule.'
    },
    {
      question: "What's included in your group discounts?",
      answer: 'Groups of 4 or more travelers receive discounts on accommodations, activities, and transportation. The exact discount varies by destination and season.'
    }
  ];
  
  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      subject: [''],
      message: [''],
      newsletter: [false],
    });
  }
  
 toggleAnswer(index: number) {
    this.openedIndex = this.openedIndex === index ? null : index;
  }
  
  onSubmit() {
    if (this.form.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    const endpoint =
      'https://script.google.com/macros/s/AKfycbzyQTZNFHxL42nW6pwREY-w955IX5gJVXhF17-LJxNyxQH4fXxheLQEh6VYwEMMxFgAIg/exec';
    
    this.http
      .post(endpoint, this.form.value, {
        headers: { 'Content-Type': 'application/json' },
      })
      .subscribe({
        next: (res: any) => {
          if (res?.result === 'success') {
            alert('Form submitted successfully!');
            this.form.reset();
          } else {
            alert(
              'Server responded with error: ' +
                (res?.message || 'Unknown error')
            );
          }
        },
        error: (err) => {
          console.error('Submission error:', err);
          alert('Something went wrong while submitting the form.');
        },
      });


  }

  openGoogleForm() {
    const googleFormUrl = 'https://forms.gle/UuDjMh1qPQqicU4o6';
    window.open(googleFormUrl, '_blank');
  }
}

