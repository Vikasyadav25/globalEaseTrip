import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent {
  form: FormGroup;
  status: string = '';
  loading = false;
  
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
  private WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbw8zVw8fraR7x6pSh1y70jOVHEBpJIsHytlQaQ1hXA39zw2eWWTvyc-ZhoMqxTgvd3Kjw/exec';
  
  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      newsletter: [false],
    });
  }
  
 toggleAnswer(index: number) {
    this.openedIndex = this.openedIndex === index ? null : index;
  }
  
  async onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;

    const body = new URLSearchParams(this.form.value as any);

    console.log("🚀 Sending form-urlencoded:", body.toString());

    try {
      await fetch(this.WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      });

      this.status = '🎉 Message sent successfully!';
      this.form.reset();
    } catch (err) {
      console.error("❌ Error sending:", err);
      this.status = '❌ Failed to send.';
    } finally {
      this.loading = false;
    }
  }




  openGoogleForm() {
    const googleFormUrl = 'https://forms.gle/UuDjMh1qPQqicU4o6';
    window.open(googleFormUrl, '_blank');
  }

}

