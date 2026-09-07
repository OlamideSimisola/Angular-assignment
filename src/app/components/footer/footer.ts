import { Component } from '@angular/core';
import { SocialLink } from '../../models/social-link';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  /** Read from a live Date so the copyright never goes stale. */
  readonly currentYear = new Date().getFullYear();

  readonly socials: SocialLink[] = [
    { label: 'Facebook', icon: 'bi-facebook' },
    { label: 'Twitter', icon: 'bi-twitter' },
    { label: 'Instagram', icon: 'bi-instagram' },
    { label: 'Behance', icon: 'bi-behance' },
    { label: 'Dribbble', icon: 'bi-dribbble' },
  ];
}
