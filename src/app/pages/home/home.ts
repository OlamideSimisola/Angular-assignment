import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CtaBanner } from '../../components/cta-banner/cta-banner';
import { Features } from '../../components/features/features';
import { Hero } from '../../components/hero/hero';
import { ShowcaseGrid } from '../../components/showcase-grid/showcase-grid';
import { Showcase } from '../../models/showcase';

const SCREENSHOTS = 'https://prium.github.io/Posh/v2.1.0/assets/images/screenshots';

@Component({
  selector: 'app-home',
  imports: [Hero, ShowcaseGrid, Features, CtaBanner],
  templateUrl: './home.html',
})
export class Home {
  private readonly router = inject(Router);

  /** Content handed to <app-hero> as inputs rather than hardcoded in it. */
  readonly heroPrefix = 'Create';
  readonly heroSuffix = 'websites';
  readonly heroWords = ['beautiful', 'stunning', 'modern', 'fast'];
  readonly heroSubtext = 'Anything you can design, you can design better.';
  readonly heroMockups = [
    `${SCREENSHOTS}/home-digital-agency.jpg`,
    `${SCREENSHOTS}/page-about-company.jpg`,
    `${SCREENSHOTS}/home-personal.jpg`,
  ];

  private readonly demosSection =
    viewChild<ElementRef<HTMLElement>>('demosAnchor');

  /** The hero only emits — deciding what a CTA does is the page's job. */
  onExploreDemos(): void {
    this.demosSection()?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  onPurchase(): void {
    this.router.navigate(['/contact']);
  }

  /**
   * The original's cards link to a demo page. There is none here, so a click
   * opens the contact form with the demo already named.
   */
  onDemoSelected(showcase: Showcase): void {
    this.router.navigate(['/contact'], {
      queryParams: { subject: `Question about the ${showcase.title} demo` },
    });
  }
}
