import {
  Component,
  computed,
  HostListener,
  inject,
  output,
  signal,
} from '@angular/core';
import { Showcase } from '../../models/showcase';
import { DemoService } from '../../services/demo.service';
import { ShowcaseCard } from '../showcase-card/showcase-card';

@Component({
  selector: 'app-showcase-grid',
  imports: [ShowcaseCard],
  templateUrl: './showcase-grid.html',
  styleUrl: './showcase-grid.scss',
})
export class ShowcaseGrid {
  private readonly demoService = inject(DemoService);

  readonly showcases: Showcase[] = this.demoService.getShowcases();

  /** How many columns fit at the current width. */
  readonly columnCount = signal(this.fittingColumns());

  /** Roughly the caption's height as a fraction of a tile's width. */
  private static readonly CAPTION_WEIGHT = 0.2;

  /**
   * The original uses a masonry layout: each tile sits directly under the one
   * above it rather than stretching to its row. Dealing tiles round-robin
   * does that but leaves the columns very uneven, because the screenshots
   * differ wildly in height. So each tile goes to whichever column is
   * currently shortest, measured in the tiles' own aspect ratios — the
   * columns then finish at close to the same depth.
   */
  readonly columns = computed<Showcase[][]>(() => {
    const count = this.columnCount();
    const columns: Showcase[][] = Array.from({ length: count }, () => []);
    const heights = new Array<number>(count).fill(0);

    for (const showcase of this.showcases) {
      let shortest = 0;
      for (let i = 1; i < count; i++) {
        if (heights[i] < heights[shortest]) {
          shortest = i;
        }
      }
      columns[shortest].push(showcase);
      heights[shortest] += showcase.ratio + ShowcaseGrid.CAPTION_WEIGHT;
    }

    return columns;
  });

  /** Passes a card's click on to the page. */
  readonly selected = output<Showcase>();

  @HostListener('window:resize')
  onResize(): void {
    this.columnCount.set(this.fittingColumns());
  }

  private fittingColumns(): number {
    const width = window.innerWidth;
    if (width < 576) {
      return 1;
    }
    return width < 992 ? 2 : 3;
  }
}
