import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-popup.html',
  styleUrl: './alert-popup.css'
})
export class AlertPopupComponent implements OnInit, OnDestroy {
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();
  @Output() claim = new EventEmitter<void>();

  timeLeft = {
    days: 15,
    hours: 8,
    minutes: 45,
    seconds: 0
  };

  private countdownInterval?: number;

  private targetDate = new Date("2025-09-20T23:59:59"); // Diwali target date

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  startCountdown() {
    this.updateCountdown(); // run immediately once
    this.countdownInterval = window.setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  updateCountdown() {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    if (distance <= 0) {
      this.timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      clearInterval(this.countdownInterval);
      return;
    }

    this.timeLeft.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.timeLeft.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.timeLeft.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.timeLeft.seconds = Math.floor((distance % (1000 * 60)) / 1000);
  }
  closePopup() {
    this.close.emit();
  }

  claimOffer() {
    this.claim.emit();
    this.closePopup();
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closePopup();
    }
  }
}

