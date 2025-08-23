import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-partners-marquee',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './partners-marquee.html',
  styleUrl: './partners-marquee.css'
})
export class PartnersMarquee {

}
