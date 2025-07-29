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
    minutes: 45
  };

  private countdownInterval?: number;

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  startCountdown() {
    this.countdownInterval = window.setInterval(() => {
      if (this.timeLeft.minutes > 0) {
        this.timeLeft.minutes--;
      } else if (this.timeLeft.hours > 0) {
        this.timeLeft.hours--;
        this.timeLeft.minutes = 59;
      } else if (this.timeLeft.days > 0) {
        this.timeLeft.days--;
        this.timeLeft.hours = 23;
        this.timeLeft.minutes = 59;
      }
    }, 60000); // Update every minute
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

