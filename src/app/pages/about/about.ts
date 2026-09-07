import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DemoService } from '../../services/demo.service';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  private readonly demoService = inject(DemoService);

  readonly demoCount = this.demoService.getShowcases().length;
  readonly categories = this.demoService.getCategories();

  readonly milestones = [
    { year: '2017', title: 'Founded', text: 'Posh started as a single landing page template.' },
    { year: '2020', title: 'Went modular', text: 'The layout system was rebuilt from the ground up.' },
    { year: '2022', title: 'Bootstrap 5', text: 'Every demo was migrated to the latest framework.' },
    { year: '2024', title: 'Today', text: `${this.demoCount} ready-made demos and pages, and counting.` },
  ];
}
