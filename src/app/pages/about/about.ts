import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent {

  scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

}

