/** A single demo screenshot shown in the showcase grid. */
export interface Showcase {
  id: number;
  title: string;
  /** Sites the demo was inspired by, e.g. "Nokia 5" */
  inspiration?: string;
  category: ShowcaseCategory;
  image: string;
  /**
   * Screenshot height divided by its width. The grid uses it to balance the
   * masonry columns without waiting for the images to load.
   */
  ratio: number;
}

export type ShowcaseCategory = 'Demos' | 'Pages' | 'Shop' | 'Portfolio' | 'Blog';
