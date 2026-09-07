import { Component, inject } from '@angular/core';
import { Feature } from '../../models/feature';
import { DemoService } from '../../services/demo.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.html',
  styleUrl: './features.scss',
})
export class Features {
  private readonly demoService = inject(DemoService);

  /** Four one-line callouts, rendered with @for instead of four <p> tags. */
  readonly features: Feature[] = this.demoService.getFeatures();
}
