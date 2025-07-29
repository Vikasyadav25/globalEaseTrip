import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent {
  form: FormGroup;
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
    const googleFormUrl = 'https://forms.google.com/your-form-id';
    window.open(googleFormUrl, '_blank');
  }
}

