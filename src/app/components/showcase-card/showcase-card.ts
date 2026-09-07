import { Component, input, output } from '@angular/core';
import { Showcase } from '../../models/showcase';

/** One demo tile: caption above the screenshot, as in the original. */
@Component({
  selector: 'app-showcase-card',
  templateUrl: './showcase-card.html',
  styleUrl: './showcase-card.scss',
})
export class ShowcaseCard {
  readonly showcase = input.required<Showcase>();

  /** Bubbles the chosen demo up to the grid. */
  readonly selected = output<Showcase>();

  onSelect(event: Event): void {
    // The original links to a demo page; this rebuild has none, so the
    // parent decides what to do with the click.
    event.preventDefault();
    this.selected.emit(this.showcase());
  }
}
