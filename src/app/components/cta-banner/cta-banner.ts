import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-cta-banner',
  templateUrl: './cta-banner.html',
  styleUrl: './cta-banner.scss',
})
export class CtaBanner {
  readonly heading = input('Want to see the magic? Start creating with POSH');
  readonly buttonLabel = input('Purchase now');

  readonly ctaClicked = output<void>();
}
